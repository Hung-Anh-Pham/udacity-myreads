import "./css/App.css";
import { useState, useEffect } from "react";
import PageHeader from "./components/PageHeader";
import Bookshelf from "./components/Bookshelf";
import * as BooksAPI from "./api/BooksAPI";
import SearchPage from "./components/SearchPage";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookshelfs, setBookshelfs] = useState({})

  const shelfs = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  const searchBooks = async (query, maxResults) => {
    try {
      const res = await BooksAPI.search(query, maxResults);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  const updateBook = async (book, shelf) => {
    try {
      // Update book shelf via API
      await BooksAPI.update(book, shelf);

      // Update local state
      setBookshelfs((prevBookshelfs) => {
        // Remove book from its current shelf
        const updatedBookshelfs = { ...prevBookshelfs };
        const oldShelf = book.shelf;
        if (oldShelf && updatedBookshelfs[oldShelf]) {
          updatedBookshelfs[oldShelf] = updatedBookshelfs[oldShelf].filter(b => b.id !== book.id);
        }

        // Add book to the new shelf
        if (!updatedBookshelfs[shelf]) {
          updatedBookshelfs[shelf] = [];
        }
        updatedBookshelfs[shelf].push({ ...book, shelf });

        return updatedBookshelfs;
      });
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  }


  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      const bs = {};

      // Loops through res and groups books by shelf
      res.forEach((book) => {
        const shelf = book['shelf'];
        if (!bs[shelf]) {
          bs[shelf] = [];
        }
        bs[shelf].push(book);
      });

      setBookshelfs(bs);
    };

    getBooks();
  }, []);

  return (
    <div className="app">

      <Routes>
        <Route
          path="/search"
          element={
            <SearchPage onUpdate={updateBook} onSearch={searchBooks} />
          }
        />

        <Route
          exact path="/"
          element={
            <div className="list-books">

              <PageHeader title={"MyReads"} />

              <div className="list-books-content">
                {
                  Object.keys(shelfs).map((shelfKey) => {
                    return (
                      <div key={shelfKey}>
                        <Bookshelf
                          shelf={shelfs[shelfKey]}
                          books={bookshelfs[shelfKey] || []}
                          onUpdate={updateBook}
                        />
                      </div>
                    )
                  })
                }
              </div>

              <div className="open-search">
                <Link to={"/search"}>Add a book</Link>
              </div>
            </div>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
