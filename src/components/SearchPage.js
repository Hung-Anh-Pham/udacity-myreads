import { useEffect, useState } from "react";
import Book from "./Book";
import * as BooksAPI from "../api/BooksAPI";
import * as Shelfs from "../utils/Shelfs";

const SearchPage = ({ navigator, maxResults, debounceDelay }) => {

    const [searching, setSearching] = useState(false);
    const [message, setMessage] = useState(null);
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (query) {
            
            // Set a timeout to delay the API call
            const delayDebounceFn = setTimeout(
                async () => {

                    // Update Search state
                    setSearching(true);
                    try {
                        // Call API
                        const response = await BooksAPI.search(query.trim(), maxResults);

                        // Update Books state
                        if (Array.isArray(response)) {
                            const currentBooks = await BooksAPI.getAll();

                            // Add bookshelves into the queriedBooks
                            const mappedBookshelves = Shelfs.mapBookshelves(currentBooks, response);
                            setBooks(mappedBookshelves);
                            setBooks(response);
                            setMessage(null);
                        } else {
                            setBooks([]);
                            setMessage('Book Not Found');
                        }
                    } catch (error) {
                        console.log(error)
                        setMessage('An unexpected error occured.');
                    } finally {
                        setSearching(false);
                    }
                }, debounceDelay
            );

            // Cleanup function to clear the timeout if the user types again before delay finishes
            return () => clearTimeout(delayDebounceFn);
        } else {
            setBooks([]);
        }
    }, [query, maxResults, debounceDelay]);

    const updateQuery = (event) => {
        setQuery(event.target.value);
    }

    const updateShelfOptions = async (book, shelf) => {
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
                        onChange={updateQuery}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searching && !message ? (<span> loading... </span>)
                            : message ? (<div className="message"> {message} </div>)
                                : (
                                    books.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                handleShelfChanger={updateShelfOptions}
                                            />
                                        </li>
                                    ))
                                )
                    }
                </ol>
            </div>
        </div>
    )
}

export default SearchPage;