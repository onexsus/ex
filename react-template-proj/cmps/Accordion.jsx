
const { useState } = React


export function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const arrow = isOpen ? '▲' : '▼';
    return (
        <section className="accordion">
            <section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container flex align-center">
                <h2>{title}</h2>
                <div className="arrow-icon">{arrow}</div>
            </section>
            {isOpen && <div>{children}</div>}
            <hr />
        </section>
    )
}
