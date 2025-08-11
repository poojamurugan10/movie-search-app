import React, { useState } from 'react'

export default function SearchBar({ onSearch, initial = '' }) {
  const [q, setQ] = useState(initial)
  function handleSubmit(e) {
    e.preventDefault()
    onSearch(q.trim())
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, e.g. Batman"
        className="flex-1 px-4 py-2 border rounded"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Search</button>
    </form>
  )
}