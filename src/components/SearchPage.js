import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";

const SearchPage = ({ onUpdate, onSearch }) => {

    let navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchBooks = async () => {
                const results = await onSearch(query, 10);
                setBooks(results || []);
            };
            fetchBooks();
        } else {
            setBooks([]);
        }
    }, [query, onSearch]);

    const updateQuery = (query) => {
        setQuery(query.trim());
    }

    const clearQuery = () => {
        updateQuery("");
    }

    const handleUpdate = (book, shelf) => {
        onUpdate(book, shelf);
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button onClick={() => navigate("/")}>Close</button>
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
                            <Book book={book}
                                onUpdate={handleUpdate} />
                           
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default SearchPage;