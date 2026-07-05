import { useState } from 'react'

export default function HotelModal({ hotel, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const photos = hotel.photos?.length ? hotel.photos : [hotel.thumbnail]
  const price = Number(hotel.price).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })

  function nextPhoto() {
    setPhotoIndex((i) => (i + 1) % photos.length)
  }

  function prevPhoto() {
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-gallery">
          <img src={photos[photoIndex]} alt={`${hotel.name} photo ${photoIndex + 1}`} />
          {photos.length > 1 && (
            <>
              <button className="gallery-nav prev" onClick={prevPhoto} aria-label="Previous photo">
                ‹
              </button>
              <button className="gallery-nav next" onClick={nextPhoto} aria-label="Next photo">
                ›
              </button>
              <span className="gallery-count">
                {photoIndex + 1} / {photos.length}
              </span>
            </>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-heading">
            <h2>{hotel.name}</h2>
            <span className="rating-badge">★ {hotel.rating}</span>
          </div>
          <p className="location">{hotel.location}</p>
          <p className="description">{hotel.description}</p>

          <div className="modal-price-row">
            <div>
              <span className="price-label">per night</span>
              <span className="price-amount">₹{price}</span>
            </div>
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
