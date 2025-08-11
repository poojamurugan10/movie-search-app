import React, { useState, useEffect, useCallback } from 'react'
import SearchBar from '../Components/SearchBar'
import TypeFilter from '../Components/TypeFilter'
import MovieList from '../Components/MovieList'
import Pagination from '../Components/Pagination'
import { searchMovies } from '../api'
import { loadFavorites, saveFavorites } from '../utils/storage'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => loadFavorites())

  const favoriteIds = favorites.map((f) => f.imdbID)

  // Fetch function
  const runSearch = useCallback(async (q, t, p) => {
    if (!q) {
      setMovies([])
      setTotalResults(0)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await searchMovies({ query: q, type: t, page: p })
      if (res.Response === 'True') {
        setMovies(res.Search || [])
        setTotalResults(Number(res.totalResults || 0))
      } else {
        setMovies([])
        setTotalResults(0)
        setError(res.Error || 'No results')
      }
    } catch (e) {
      setError(e.message)
      setMovies([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }, [])

  // user actions
  function handleSearch(q) {
    setQuery(q)
    setPage(1)
    runSearch(q, type, 1)
  }

  function handleTypeChange(t) {
    setType(t)
    setPage(1)
    runSearch(query, t, 1)
  }

  function handlePageChange(p) {
    const maxPage = Math.ceil(totalResults / 10) // OMDb returns 10 per page
    if (p < 1 || p > maxPage) return
    setPage(p)
    runSearch(query, type, p)
  }

  function toggleFavorite(movie) {
    const exists = favorites.find((f) => f.imdbID === movie.imdbID)
    let next
    if (exists) {
      next = favorites.filter((f) => f.imdbID !== movie.imdbID)
    } else {
      next = [...favorites, movie]
    }
    setFavorites(next)
    saveFavorites(next)
  }

  useEffect(() => {
    }, [])

  const totalPages = Math.ceil(totalResults / 10)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <SearchBar onSearch={handleSearch} initial={query} />
        <div className="flex items-center gap-4">
          <TypeFilter value={type} onChange={handleTypeChange} />
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && movies && movies.length === 0 && query && (
        <div>No results found for "{query}"</div>
      )}

      <MovieList movies={movies} onToggleFav={toggleFavorite} favoriteIds={favoriteIds} />

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}