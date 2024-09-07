import { useState, useEffect } from "react";
import Book from "./Book";
import * as BooksAPI from "../api/BooksAPI";
import * as Shelfs from "../utils/Shelfs";

const SearchPage = ({ navigator, maxResults }) => {

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Check if the query is not null
        if (query) {
            const fetchBooks = async () => {
                try {
                    const queriedBooks = await BooksAPI.search(query, maxResults);
                    const currentBooks = await BooksAPI.getAll();

                    // Add shelfs into the queriedBooks
                    const queriedBooksWithShelf = Shelfs.mapShelfToQueriedBook(currentBooks, queriedBooks);
                    setBooks(queriedBooksWithShelf);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchBooks();
        } else {
            setBooks([]);
        }
    }, [query, maxResults]);

    const updateQuery = (query) => {
        setQuery(query.trim());
    }

    const updateShelf = async (book, shelf) => {
        try {
            // Update book shelf via API
            await BooksAPI.update(book, shelf);

            // Filter and update shelf
            setBooks((prevBooks) => {
                return prevBooks.map((b) =>
                    b.id === book.id ? { ...b, shelf } : b
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => navigator("/")}>Close</button>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                handleShelfChanger={updateShelf}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default SearchPage;