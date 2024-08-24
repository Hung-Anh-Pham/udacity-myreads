import { useState, useEffect, useMemo } from "react";

const BookshelfChanger = ({ book, onUpdate }) => {

    // Selected option state
    const [selectedOption, setSelectedOption] = useState("");
    const [optionsList, setOptionsList] = useState([]);

    // List of options
    const options = useMemo(() => {
        return [
        { value: "currentlyReading", label: "Currently Reading" },
        { value: "wantToRead", label: "Want to Read" },
        { value: "read", label: "Read" },
        { value: "none", label: "None" },
    ]}, []);


    useEffect(() => {
        if (book.shelf === "none") {
            // Filter out 'none' when shelf is empty
            const filteredList = options.filter(o => o.value !== "none");
            setOptionsList(filteredList);
        } else {
            // Show all options when there is a shelf
            setOptionsList(options);
        }
        setSelectedOption(book.shelf); // Set selected option based on book shelf
        console.log(book.shelf);
    }, [book, options]);

    
    // Handler for when the selected option changes
    const handleChange = (e) => {
        const selected = e.target.value;
        setSelectedOption(selected);
        onUpdate(book, selected);
    }

    const getTitle = () => {
        return selectedOption === "none" ? "Add to..." : "Move to...";
    }

    return (
        <div className="book-shelf-changer">
            <select value={selectedOption} onChange={handleChange}>
               
                <option value="none" disabled>
                    {
                        getTitle()
                    }
                </option>

                {
                    optionsList.map((option) => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
};

export default BookshelfChanger;