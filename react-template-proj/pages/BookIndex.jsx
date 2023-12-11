import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";

const { useState, useEffect } = React;

export function BooksIndex() {
  const [books, setBooks] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  useEffect(() => {
    loadBooks();
    return () => {
    };
  }, [filterBy]);

  function loadBooks() {
    bookService.query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log("err:", err));
  }
  function onRemoveBook(bookId) {
    bookService.remove(bookId)
      .then(() => {
        setBooks((prevBooks) => {
          return prevBooks.filter((book) => book.id !== bookId);
        });
      })
      .catch((err) => console.log("err:", err));
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId);
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <section className="bookindex flex flex-column align-center ">
      <div className="bookindex-continer">
        <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <BookList
          books={books}
          onSelectBookId={onSelectBookId}
          onRemoveBook={onRemoveBook}
        />
      </div>
    </section>
  );
}
