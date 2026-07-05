# Stay Finder

A minimal hotel search web app built with Vite + React (JS) and vanilla CSS.

## Features

- 🔍 Search hotels by name or city
- ↕️ Sort by price (low→high, high→low) or rating
- 📄 Pagination — 20 hotels per page, with numbered page buttons (`1 2 3 4 5 6 … 10`) plus Prev/Next
- 🖼️ Click a hotel card to open a detail modal with a swipeable photo gallery
- 🎟️ Ticket-stub card design — dashed perforation between the photo and price

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool & dev server
- [React](https://react.dev/) (JS, no TypeScript)
- Vanilla CSS (no framework/UI library)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Configuring the API

Hotel data is fetched from an API in `src/api.js`. Open that file and replace the placeholder with your real endpoint:

```js
const API_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/'
```

The app expects the response in this shape:

```json
{
  "status": 200,
  "count": 500,
  "returned": 500,
  "message": "Successfully fetched hotel list",
  "data": [
    {
      "id": 1,
      "name": "Hotel Regal Crescent",
      "price": "8531.24",
      "thumbnail": "https://...",
      "rating": 3.4,
      "location": "Noida",
      "description": "...",
      "photos": ["https://...", "https://..."]
    }
  ]
}
```

## Project Structure

```
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx                # App state: fetch, search, sort, pagination
    ├── api.js                 # fetchHotels() — API call
    ├── index.css               # All styling
    └── components/
        ├── SearchBar.jsx        # Search input + sort dropdown
        ├── HotelCard.jsx         # Hotel grid card
        ├── HotelModal.jsx        # Detail view with photo gallery
        └── Pagination.jsx        # Page number nav + Prev/Next
```

## Notes

- Pagination shows 20 hotels per page. Changing the search query or sort order resets you to page 1.
- No backend or database is included — this is a frontend-only client for whatever hotel API you point it at.
