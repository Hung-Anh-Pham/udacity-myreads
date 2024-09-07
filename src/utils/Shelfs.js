
export const getShelfs = () => ({
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None",
});

export const mapShelfToQueriedBook = (currentBooks, queriedBooks) => {
    // Validate the books' type manually
    if (!Array.isArray(currentBooks)
        || !Array.isArray(queriedBooks)
    ) {
        return [];
    }

    // Update the searched books' shelfs
    const currentBookIds = currentBooks.map(cb => cb.id);
    return queriedBooks.map((sb) => {
        if (currentBookIds.includes(sb.id)) {
            sb.shelf = currentBooks.find(sb.id).shelf;
        } else {
            sb.shelf = "none";
        }
        return sb;
    });
};