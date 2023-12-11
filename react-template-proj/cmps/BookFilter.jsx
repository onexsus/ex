
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = (target.value.type==='number') ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    const { title, minPrice } = filterByToEdit
    return (
        <section className="books-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="byTitle">Name: </label>
                <input value={title} onChange={handleChange} type="text" id="byTitle" name="title" />

                <label htmlFor="minPrice">minPrice: </label>
                <input value={minPrice || 0} onChange={handleChange} type="number" id="minPrice" name="minPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}