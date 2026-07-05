export default function SearchBar({ query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by hotel name or city..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="relevance">Sort: Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  )
}
