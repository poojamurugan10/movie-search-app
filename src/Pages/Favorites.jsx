import React, { useState } from 'react'
import { loadFavorites, saveFavorites } from "../Utils/Storage";
import MovieList from '../Components/MovieList'

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => loadFavorites())
  const favoriteIds = favorites.map((f) => f.imdbID)

  function toggleFavorite(movie) {
    
    const next = favorites.filter((f) => f.imdbID !== movie.imdbID)
    setFavorites(next)
    saveFavorites(next)
  }

  if (favorites.length === 0) return <div>No favorites yet.</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
      <MovieList movies={favorites} onToggleFav={toggleFavorite} favoriteIds={favoriteIds} />
    </div>
  )
}