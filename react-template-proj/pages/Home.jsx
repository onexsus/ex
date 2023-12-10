// import { UserPreview } from '../cmps/UserPreview.jsx'

export function Home() {
  return (
    <section className="home full ">
      <div className="bg-image"></div>
      <div className="hero-section">
        <h1>
          Welcome to our beloved bookstore—a sanctuary where stories come alive.
        </h1>
        <p>
          Immerse in our bookstore—a haven where stories thrive. With a curated
          collection and a passion for tales, we invite you to discover a world
          of literary wonders unlike any other.
        </p>
        <button className="cta-btn" onClick={() => setPage("books")}>
          Go to Store
        </button>
      </div>
      <div className="services-cards flex ">
        <div className="service-card flex flex-column justify-center align-center">
          <div className="service-card-img">
            <img src="img/icons/icon-books.png" />
          </div>
          <h3 className="service-card-title">Books</h3>
          <div className="service-card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="service-card flex flex-column justify-center align-center">
          <div className="service-card-img ">
            <img src="img/icons/icon-5-stars.png" />
          </div>
          <h3 className="service-card-title">Shop Rating</h3>
          <div className="service-card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="service-card flex flex-column justify-center align-center">
          <div className="service-card-img">
            <img src="img/icons/icon-delivery.png" />
          </div>
          <h3 className="service-card-title">Fast Delivery</h3>
          <div className="service-card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="service-card flex flex-column justify-center align-center">
          <div className="service-card-img">
            <img src="img/icons/icon-service.png" />
          </div>
          <h3 className="service-card-title">24/7 Support</h3>
          <div className="service-card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>
    </section>
  );
}
