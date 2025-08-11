import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, onToggleFav, isFav }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Poster */}
      <div className="h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
        {!imgError && movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-auto object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x450?text=No+Image"
            alt="No Poster"
            className="h-full w-auto object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{movie.Title}</h3>
        <p className="text-sm text-gray-500 mt-1">{movie.Year}</p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            Details
          </Link>
          <button
            onClick={() => onToggleFav(movie)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              isFav
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isFav ? 'Unfav' : 'Fav'}
          </button>
        </div>
      </div>
    </div>
  );
}
