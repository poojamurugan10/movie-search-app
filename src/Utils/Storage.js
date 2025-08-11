const FAVORITES_KEY = 'movies_favorites_v1';

export function loadFavorites() {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
}


export function saveFavorites(favorites) {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}
