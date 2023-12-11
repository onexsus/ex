

const { useState, useEffect } = React;

export function BookEdit({ book, onUpdate, onCancelEdit }) {
  const [bookToEdit, setBookToEdit] = useState(book)

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
      setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, amount: value } }))
    } else {
      setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    onUpdate(bookToEdit)
  }

  

  return (
    <section className="book-details-container">
        <div className="book-details-title">{book.title}</div>
        <div className="book-thumbnail-container">
            <img src={book.thumbnail}/>
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

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Price:</span>
              <span className='book-details-info-text'>
                <input
                  type='text'
                  placeholder='Set Price'
                  name='price'
                  onChange={handleChange}
                  value={bookToEdit.listPrice.amount}
                />
              </span>
            </div>

            <div className='book-edit-actions-container'>
              <button className='save-edit-btn' onClick={onSaveBook}>
                Save ✔
              </button>
              <button
                className='cancel-edit-btn'
                onClick={onCancelEdit}
              >
                Cancel ✖
              </button>
            </div>
            </div>

            <div className="book-details-info-row">
                <span className="book-details-info-title">Description: </span><span className="book-details-info-text">{book.description}</span>
            </div>
            </div>
            </div>
    </section>
    )
}
