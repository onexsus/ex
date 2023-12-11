import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BooksIndex } from './pages/BookIndex.jsx'
const { useState } = React
export function App() {
    const [page, setPage] = useState('books')
    return (
        <section className="app main-layout">
            <header className="app-header  full main-layout">
                <div className="app-header-continer flex align-center justify-between ">
                <div className="header-logo"><img src="img/book-store-logo.png"></img></div>
                <nav className="app-nav ">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                        <a onClick={() => setPage('books')} href="#">Books</a>
                    </nav>
                </div>
            </header>
            <main className="main-continer full main-layout ">
                {/* <Home />  */}
                {/* <About /> */}
                <BooksIndex />
                {/* {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <BooksIndex />} */}
            </main>
        </section>
    )
}