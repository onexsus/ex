
const { Outlet, Link } = ReactRouterDOM

export function About() {
  return (
    <section className="about flex flex-column align-center ">
      <div className="about-continer">
      <h1>About Us</h1>
        <img src="./img/store-book-about.jpg"></img>
      <p>
        At Bookstore, we're passionate about books. Since 2020, our
        shelves have held a curated collection catering to diverse tastes. We're
        more than a store; we're a community fostering a love for reading.
        Explore our varied selection, attend events, and engage in lively
        discussions. Join us in celebrating the joy of reading!
      </p>
      <nav className="flex justify-between">
       <div>  <Link to="/about/team">Team</Link></div>
        <div> <Link to="/about/goal">Goal</Link></div>
     </nav>
     <Outlet />
      </div>
    </section>
    
  );
}
