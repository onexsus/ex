


export function BookDetails({ book, onGoBack, onGoEdit }) {

console.log(book)


  return (
      <section className="book-details-container">
          <div className="book-details-title">{book.title}</div>
          <div className="book-thumbnail-container">
              <img src={book.thumbnail}/>
          </div>
           <div className="book-details">
          <div className="book-details-info">

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Author: </span>
                  <span className="book-details-info-text">{book.authors}</span>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Categories: </span>
                  <span className="book-details-info-text">{book.categories}</span>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Pages: </span>
                  <span className="book-details-info-text">{book.pageCount}</span>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Price: </span>
                  <span className="book-details-info-text "> 
                       {book.listPrice.amount} EURO
                  </span>
              </div>

                  <div className="actions-btns">
                      <button className="go-back-btn" onClick={onGoBack}>⬅ Go Back</button>
                      <button className="go-edit-btn" onClick={onGoEdit}>Go Edit ➡</button>
                  </div>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Description: </span><span className="book-details-info-text">{book.description}</span>
              </div>
              </div>
      </section>
  )
}