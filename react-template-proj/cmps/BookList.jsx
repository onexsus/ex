import {BookPreview} from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBook }){

  return (
    <ul className="book-list clean-list">
        {books.map(book =>
            <li key={book.id}>
                <BookPreview book={book} />
                <section className="btn-book">
                    <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                    <button onClick={() => onSelectBook(book.id)}>Details</button>
                </section>
            </li>
        )}
    </ul>
)
}