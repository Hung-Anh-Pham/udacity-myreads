import Book from "./Book";


const Bookshelf = ({ shelf, books, onUpdate }) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        onUpdate={onUpdate}
                                    />
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
};

export default Bookshelf;