
import { bookService } from "../services/book.service.js"
const { useParams, useNavigate} = ReactRouterDOM
const { useState, useEffect ,Link } = React;

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()



  useEffect(() => {
    if(params.bookId){
      loadBooks()
    }
  }, [])

  function loadBooks() {
    bookService.get(params.bookId)
        .then(book => setBookToEdit(book))
        .catch(err => {
            console.log('err:', err)
            navigate('/')
        })
}
  // const regionNames = new Intl.DisplayNames(['en'], { type: 'language' })

  function handleChange({ target }) {
    let { value, name: field } = target
    switch (field) {
      case 'title':
        value = target.value || bookToEdit.title
        break
      case 'price':
        value = +target.value || bookToEdit.listPrice.amount
        break
    }

    if (field === 'price') {
      setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...bookToEdit.listPrice, amount: value } }))
    } else {
      setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit)
            .then(() => navigate('/books'))
            .catch(err => console.log('err:', err))
  }

  function getPublisheDate() {
    const currYear = new Date().getFullYear()
    let publishedYear = bookToEdit.publishedDate
    let diff = currYear - publishedYear
    if (diff > 10) publishedYear += ' - Veteran Book'
    else if (diff < 1) publishedYear += ' - NEW!'
    return publishedYear
  }

  function getPageCount() {
    // Switch case is fine
    let pageCount = bookToEdit.pageCount
    if (bookToEdit.pageCount > 500) pageCount += ' - Long reading'
    else if (bookToEdit.pageCount > 200) pageCount += ' - Decent reading'
    else if (bookToEdit.pageCount < 100) pageCount += ' - Light rading'
    return pageCount
  }
  function onBack() {
    navigate('/books')
    // navigate(-1)
}

  

  return (
    <section className="book-details-container">
        <div className="book-details-title">{bookToEdit.title}</div>
        <div className="book-thumbnail-container">
          {bookToEdit.listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}
              <img src={bookToEdit.thumbnail}/>
          </div>
         <div className="book-details">
        <div className="book-details-info">

        <div className='book-details-info'>
            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Title:</span>
              <span className='book-details-info-text'>
                <input
                  type='text'
                  placeholder='Enter New Title'
                  name='title'
                  value={bookToEdit.title}
                  onChange={handleChange}
                />
              </span>
            </div>
            
            <div className="book-details-info-row">
                    <span className="book-details-info-title">Year publish: </span>
                    <span className="book-details-info-text">{getPublisheDate()}</span>
                </div>

            <div className="book-details-info-row">
                <span className="book-details-info-title">Author: </span>
                <span className="book-details-info-text">{bookToEdit.authors}</span>
            </div>

            <div className="book-details-info-row">
                <span className="book-details-info-title">Categories: </span>
                <span className="book-details-info-text">{bookToEdit.categories}</span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Pages:</span>
              <span className='book-details-info-text'>{getPageCount()}</span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Price:</span>
              <span className='book-details-info-text'>
                <input
                  type='number'
                  placeholder='Set Price'
                  name='price'
                  onChange={handleChange}
                  value={bookToEdit.listPrice.amount}
                />
              </span>
            </div>

            <div className='book-edit-actions-container'>
              <button  className='save-edit-btn' onClick={onSaveBook}>
                Save ✔
              </button>
              <button
                className='cancel-edit-btn'
                onClick={onBack}
              >
                Cancel ✖
              </button>
            </div>
            </div>

            <div className="book-details-info-row">
                <span className="book-details-info-title">Description: </span><span className="book-details-info-text">{bookToEdit.description}</span>
            </div>
            </div>
            </div>
    </section>
    )
}
