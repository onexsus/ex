
const { Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header  full main-layout">
    <div className="app-header-continer flex align-center justify-between ">
      <div className="header-logo">
        <img src="img/book-store-logo.png"></img>
      </div>
      <nav className="app-nav ">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/books">Books</Link>
      </nav>
    </div>
    </header>
  );
}
