import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import SearchPage from './Pages/SearchPage'
import MovieDetails from './Pages/MovieDetails'
import Favorites from './Pages/Favorites'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">MovieFinder 🎬</Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Search</Link>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        Built with OMDb API
      </footer>
    </div>
  )
}