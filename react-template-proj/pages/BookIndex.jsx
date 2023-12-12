
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React;

export function BooksIndex() {
  const [books, setBooks] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  // const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  useEffect(() => {
    loadBooks()
}, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log("err:", err));
  }
  function onRemoveBook(bookId) {
    bookService.remove(bookId)
      .then(() => {
        setBooks((prevBooks) => {
          return prevBooks.filter((book) => book.id !== bookId)
        })
        showSuccessMsg(`Book successfully removed! ${bookId}`)
      })
      .catch((err) => console.log("err:", err));
  }

  function onUpdateBook(bookToSave) {
    bookService.save(bookToSave)
        .then((savedBook) => {
            setSelectedBook(bookToSave)
            setIsEdit(false)
            setBooks(prevBooks => prevBooks.map((b) => b.id === savedBook.id ? savedBook : b))
        })
}
function onSelectBook(bookId) {
  bookService.getById(bookId).then((book) => {
      setSelectedBook(book)
  })
}
  // function onSelectBookId(bookId) {
  //   setSelectedBookId(bookId);
  // }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <section className="bookindex flex flex-column align-center ">

      <div className="bookindex-continer">
        <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <Link to="/books/edit" className='btn-add-book'>Add Book</Link>
        <BookList
          books={books}
          onSelectBook={onSelectBook}
          onRemoveBook={onRemoveBook}
        />
      </div>
    </section>
  );
}
