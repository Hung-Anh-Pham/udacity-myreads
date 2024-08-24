import BookshelfChanger from "./BookshelfChanger";

const Book = ({ book, onUpdate }) => {

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book['imageLinks']['thumbnail']})`,
                    }}
                ></div>
                <BookshelfChanger book={book} onUpdate={onUpdate}/>
            </div>
            <div className="book-title">{book['title']}</div>
            <div className="book-authors">{book['authors']}</div>
        </div>
    )
};

export default Book;