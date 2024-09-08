import Joi from 'joi';

export const getShelfs = () => ({
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None",
});

export const mapBookshelves = (currentBooks, queriedBooks) => {
    // Define the schema
    const schema = Joi.object({
        currentBooks: Joi.array().required(),
        queriedBooks: Joi.array().required(),
    });

    const { error } = schema.validate({ currentBooks, queriedBooks });

    if (error) {
        console.error('Validation error:', error.details[0].message);
        throw new Error(error.details[0].message);
    }

    // Update the searched books' shelfs
    const currentBookIds = currentBooks.map(cb => cb.id);
    
    return queriedBooks.map((qb) => {
        if (currentBookIds.includes(qb.id)) {
            const foundBook = currentBooks.find(b => b.id === qb.id);

            // Check if the book was found and assign its shelf, otherwise fallback
            if (foundBook) {
                qb.shelf = foundBook.shelf;
            } else {
                qb.shelf = "none";
            }
        } else {
            qb.shelf = "none";
        }
        return qb;
    });
};