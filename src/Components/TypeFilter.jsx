import React from 'react'


export default function TypeFilter({ value, onChange }) {
  return (
    <div className="inline-block">
      <label className="mr-2">Type:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1 border rounded"
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    </div>
  )
}