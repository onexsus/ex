

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BooksIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

// const Router = ReactRouterDom.BrowserRouter
export function App() {

  return (
    <Router>
    <section className="app main-layout">
        <AppHeader/>

      <main className="main-continer full main-layout ">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/books" element={<BooksIndex/>} />
          <Route path="/books/:bookId" element={<BookDetails/>} />
          <Route path="/books/edit" element={<BookEdit/>} />
          <Route path="/books/edit/:bookId" element={<BookEdit/>} />
        </Routes>
        {/* {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <BooksIndex />} */}
      </main>
    </section>
    </Router>
  );
}
