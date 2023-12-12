import { bookService } from '../services/book.service.js'
import { StarRating } from './StarRating.jsx'

const { useState } = React

export function AddReview({ onAddReview }) {
  const [reviewToEdit, setReviewToEdit] = useState(bookService.getEmptyReview())

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
  }

  function onSaveReview(ev) {
    ev.preventDefault()
    onAddReview(reviewToEdit)
  }

  const { fullname, readAt } = reviewToEdit

  return (
    <section className='book-edit'>
      <form onSubmit={onSaveReview}>
        <div>
        <label htmlFor='fullname'>Fullname:</label>
        <input
          onChange={handleChange}
          value={fullname}
          type='text'
          name='fullname'
          id='fullname'
          required
          />
          </div>
          <div>


        <StarRating handleChange={handleChange} />
        {/* <select name="rating" onChange={handleChange}> */}
          {/* {[...Array(5)].map((_,i)=> (
            <option value={i+1} key={i+1}>{'🟡'.repeat(i+1)}</option>
          ))} */}
        {/* </select> */}
          </div>
          <div className="read-date-input">
        <label htmlFor='readAt'>Read at:</label>
        <input 
          onChange={handleChange}
          value={readAt}
          type='date'
          name='readAt'
          id='readAt'
          required
          />
          </div>

        <button className="btn-save-review">Save</button>
      </form>
    </section>
  )
}