
import { bookService } from "../services/book.service.js"
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { Accordion } from '../cmps/Accordion.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isReview, setIsReview] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      loadBooks()
    }, [params.bookId])


    function loadBooks() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/books')
        // navigate(-1)
    }

    function onAddReview(reviewToAdd) {
        console.log('review to add', reviewToAdd);
        bookService.addReview(book.id, reviewToAdd)
          .then(updatedBook => {
            setBook(updatedBook)
            setIsReview(false)
            showSuccessMsg('Review saved successfully')
          })
          .catch(err => {
            console.log('err:', err)
            showErrorMsg('Error saving review')
          })
      }
    
      function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
          .then(savedBook => {
            setBook(savedBook)
            showSuccessMsg('Review deleted successfully')
          })
          .catch(err => {
            console.log('err:', err)
            showErrorMsg('Error deleting review')
            navigate('/book')
          })
      }

    console.log('Render');

    if (!book) return <div>Loading...</div>

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
                      <button className="go-back-btn" onClick={onBack}>⬅ Go Back</button>
                      <Link className="go-edit-btn" to={`/books/edit/${book.id}`}>Go Edit ➡</Link>
                  </div>
              </div>

              <div className="book-details-info-row">
                  <span className="book-details-info-title">Description: </span><span className="book-details-info-text">{book.description}</span>
              </div>
              </div>
              <div className="accordion-review-add">

              <Accordion title="Add Review">
               <AddReview onAddReview={onAddReview} />
              </Accordion>
              </div>
              <div className="accordion-reviews">
              <Accordion title="Reviews">
        {(book.reviews && book.reviews.length && (
          <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
        )) ||
          'No Reviews'}
              </Accordion>
              </div>
      </section>
  )
}