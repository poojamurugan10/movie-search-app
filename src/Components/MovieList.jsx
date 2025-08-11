import React from 'react'
import MovieCard from './MovieCard'

export default function MovieList({ movies, onToggleFav, favoriteIds }) {
  if (!movies || movies.length === 0) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} onToggleFav={onToggleFav} isFav={favoriteIds.includes(m.imdbID)} />
      ))}
    </div>
  )
}