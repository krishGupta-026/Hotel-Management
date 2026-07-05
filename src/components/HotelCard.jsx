export default function HotelCard({ hotel, onSelect }) {
  const price = Number(hotel.price).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })

  return (
    <button className="hotel-card" onClick={() => onSelect(hotel)}>
      <div className="hotel-card-image">
        <img src={hotel.thumbnail} alt={hotel.name} loading="lazy" />
        <span className="rating-badge">★ {hotel.rating}</span>
      </div>

      <div className="hotel-card-stub">
        <div className="hotel-card-info">
          <h3>{hotel.name}</h3>
          <p className="location">{hotel.location}</p>
        </div>

        <div className="hotel-card-price">
          <span className="price-label">per night</span>
          <span className="price-amount">₹{price}</span>
        </div>
      </div>
    </button>
  )
}
