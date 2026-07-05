function getPageList(current, total) {
  const delta = 2
  const range = []
  const withDots = []
  let last

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (last !== undefined) {
      if (i - last === 2) {
        withDots.push(last + 1)
      } else if (i - last !== 1) {
        withDots.push('...')
      }
    }
    withDots.push(i)
    last = i
  }

  return withDots
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = getPageList(currentPage, totalPages)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="page-dots">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className="page-btn nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </nav>
  )
}