


export function BookDetails({ book, onGoBack, onGoEdit }) {

console.log(book)

function getPriceClass() {
  if (book.listPrice.amount > 150) return 'red'
  else if (book.listPrice.amount < 20) return 'green'
  else return ''
}

function getPublisheDate() {
  const currYear = new Date().getFullYear()
  let publishedYear = book.publishedDate
  let diff = currYear - publishedYear
  if (diff > 10) publishedYear += ' - Vintage';
  else if (diff < 10) publishedYear += ' - NEW!'
  return publishedYear
}

function getPageCount() {
  // Switch case is fine
  let pageCount = book.pageCount
  if (book.pageCount > 500) pageCount += ' - Long reading'
  else if (book.pageCount > 200) pageCount += ' - Decent reading'
  else if (book.pageCount < 100) pageCount += ' - Light rading'
  return pageCount
}
console.log(book.listPrice.isOnSale)

  return (
      <section className="book-details-container">
          <div className="book-details-title">{book.title}</div>
          <div className="book-thumbnail-container">
          {book.listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}
              <img src={book.thumbnail}/>
          </div>
           <div className="book-details">
          <div className="book-details-info">
          <div className="book-details-info-row">
                    <span className="book-details-info-title">Year publish: </span>
                    <span className="book-details-info-text">{getPublisheDate()}</span>
                </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Author: </span>
                  <span className="book-details-info-text">{book.authors}</span>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Categories: </span>
                  <span className="book-details-info-text">{book.categories}</span>
              </div>

              <div className='book-details-info-row'>
              <span className='book-details-info-title'>Pages:</span>
              <span className='book-details-info-text'>{getPageCount()}</span>
            </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Price: </span>
                    <span className="book-details-info-text ">
                        only <span className={getPriceClass()}>{book.listPrice.amount}</span>
                        {/* {(!book.listPrice.isOnSale) ? ' (on sale)' : ''} */}
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