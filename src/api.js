import { API_KEY, BASE_URL } from "./config.js";

// Search movies
export async function searchMovies(query, page = 1, type = "") {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}${type ? `&type=${type}` : ""}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Get movie details
export async function getMovieDetails(id) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getMovieById(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  const data = await res.json();
  return data;
}
