# Movies Search App (local readme)

- Put your OMDb API key in `.env` as `VITE_OMDB_API_KEY`.
- Run `npm run dev` for Vite or `npm start` for CRA.
- The app performs searches via the OMDb API and uses the `type` query parameter to filter on the server side (no client-side array.filter used as requested).
- Pagination uses OMDb's `page` parameter (10 results per page).
- Favorites are saved in localStorage under `movies_favorites_v1`.

Notes about requirements:
- Search bar, results grid, details page, pagination, type filter (uses API), router, error handling are implemented.
- No use of `Array.prototype.filter()` for filter behavior — type-based filtering is done by sending `type` to the OMDb API.
```

---

## Notes & Implementation details

- OMDb returns results in pages of 10. The `totalResults` field is used to compute total pages.
- For the dropdown filter, we re-run the search with `type` param sent to API. This satisfies the constraint of not using client-side `filter()` for type filtering.
- Error messages from OMDb are surfaced to the user.
- Favorites managed via localStorage; saved minimal movie objects for listing.
- Tailwind classes are used for simple responsive styling.
