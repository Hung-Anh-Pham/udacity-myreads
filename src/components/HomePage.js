import { Link } from "react-router-dom";
import * as Shelfs from "../utils/Shelfs";
import Book from "./Book";
import { useState, useEffect } from "react";
import * as BooksAPI from "../api/BooksAPI";

const HomePage = () => {

  const { none, ...shelfs } = Shelfs.getShelfs();
  const [bookShelfs, setBookShelfs] = useState({});

  useEffect(() => {

    // Get all current books
    const getBooks = async () => {
      try {
        const res = await BooksAPI.getAll();
        const booksByShelf = {};
        res.forEach(book => {
          if (!booksByShelf[book.shelf]) {
            booksByShelf[book.shelf] = [];
          }
          booksByShelf[book.shelf].push(book);
        });
        setBookShelfs(booksByShelf);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  // Function to handle moving books between shelves
  const updateShelf = async (book, shelf) => {
    try {
      // Update book shelf via API
      await BooksAPI.update(book, shelf);

      // Update local state
      setBookShelfs((prev) => {
        // Remove the updated book from the previous shelf
        const updateShelfs = { ...prev };
        const oldShelf = book.shelf;
        if (oldShelf && updateShelfs[oldShelf]) {
          updateShelfs[oldShelf] = updateShelfs[oldShelf].filter(b => b.id !== book.id);
        }

        // Add the book to the new shelf
        if (!updateShelfs[shelf]) {
          updateShelfs[shelf] = [];
        }
        updateShelfs[shelf].push({ ...book, shelf });
        return updateShelfs;
      });
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div className="list-books">

      <div className="list-books-title">
        <h1>
          MyReads
        </h1>
      </div>

      <div className="list-books-content">
        {
          Object.keys(shelfs).map((shelf) => (
            <div key={shelf} className="bookshelf">
              <h2 className="bookshelf-title">{shelfs[shelf]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    Array.isArray(bookShelfs[shelf]) && bookShelfs[shelf]
                      .map(book => (
                        <li key={book.id}>
                          <Book
                            book={book}
                            handleShelfChanger={updateShelf} />
                        </li>
                      ))
                  }
                </ol>
              </div>
            </div>
          ))
        }
      </div>

      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );

};

export default HomePage;