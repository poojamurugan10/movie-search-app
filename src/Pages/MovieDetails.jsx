import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieById } from '../api'
import { loadFavorites, saveFavorites } from '../utils/storage'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => loadFavorites())

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await getMovieById(id)
        if (res && res.Response === 'True') setMovie(res)
        else setError(res.Error || 'Not found')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function toggleFav() {
    if (!movie) return
    const exists = favorites.find((f) => f.imdbID === movie.imdbID)
    let next
    if (exists) next = favorites.filter((f) => f.imdbID !== movie.imdbID)
    else next = [...favorites, { imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Poster: movie.Poster }]
    setFavorites(next)
    saveFavorites(next)
  }

  const isFav = favorites.some((f) => f.imdbID === movie?.imdbID)

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!movie) return null

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100">No Image</div>
          )}
        </div>
        <div className="md:flex-1">
          <h1 className="text-2xl font-bold mb-2">{movie.Title} <span className="text-sm text-gray-500">({movie.Year})</span></h1>
          <div className="mb-3 text-sm text-gray-600">{movie.Genre} • {movie.Runtime} • Rated {movie.Rated}</div>
          <p className="mb-4">{movie.Plot}</p>

          <ul className="text-sm space-y-1 mb-4">
            <li><strong>Director:</strong> {movie.Director}</li>
            <li><strong>Writer:</strong> {movie.Writer}</li>
            <li><strong>Actors:</strong> {movie.Actors}</li>
            <li><strong>Language:</strong> {movie.Language}</li>
            <li><strong>IMDB Rating:</strong> {movie.imdbRating}</li>
          </ul>

          <div className="flex gap-3">
            <button onClick={toggleFav} className={`px-3 py-2 rounded ${isFav ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
              {isFav ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
            <Link to="/" className="px-3 py-2 rounded border">Back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}