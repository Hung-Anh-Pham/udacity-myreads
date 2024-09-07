import { useEffect, useState } from "react";
import * as Shelfs from "../utils/Shelfs";

const Book = ({ book, handleShelfChanger }) => {

    const [selectedShelf, setSelectedShelf] = useState("");
    const [shelfs, setShelfs] = useState({});
    const [currentBook, setCurrentBook] = useState({});

    useEffect(() => {
        if (book.shelf === "none") {
            const { none, ...filtered } = Shelfs.getShelfs();
            setShelfs(filtered);
        } else {
            setShelfs(Shelfs.getShelfs());
        }
        setCurrentBook(book);
        setSelectedShelf(book.shelf);
    }, [book]);

    const getBookShelfChangerTitle = () => (
        book?.shelf?.toLowerCase() === "none" ? "Add to..." : "Move to..."
    );

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        id={currentBook.id}
                        value={selectedShelf}
                        onChange={(e) => handleShelfChanger(book, e.target.value)}
                    >
                        <option value="none" disabled>
                            {
                                getBookShelfChangerTitle()
                            }
                        </option>

                        {
                            Object.keys(shelfs).map((shelf) => (
                                <option
                                    key={shelf}
                                    value={shelf}
                                >
                                    {shelfs[shelf]}
                                </option>
                            )
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="book-title">{currentBook['title']}</div>
            <div className="book-authors">{currentBook['authors']}</div>
            <div className="book-subtitle">{currentBook['subtitle']}</div>
        </div>
    )
};

export default Book;