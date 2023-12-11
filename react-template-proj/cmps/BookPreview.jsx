export function BookPreview({ book }) {
  return (
      <article className="book-preview">
          <h2>Book Name: {book.title}</h2>
          <h4>Book Price: {book.listPrice.amount} </h4>
          <img src={book.thumbnail} alt={book.title} />
      </article>
  )
}