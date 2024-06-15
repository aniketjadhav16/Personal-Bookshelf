import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './PersonalBookshelfPage.css';

export default function PersonalBookshelfPage() {
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(savedBookshelf);
    }, []);

    const removeFromBookshelf = (indexToRemove) => {
        const updatedBookshelf = bookshelf.filter((_, index) => index !== indexToRemove);
        setBookshelf(updatedBookshelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    };

    return (
        <div className="bookshelfPage">
            <Link to="/" className="backToSearch">Back to Search</Link>
            <h1 className="title">My Bookshelf</h1>
            <div className="bookshelfContainer">
                {bookshelf.length > 0 ? (
                    bookshelf.map((book, index) => (
                        <div key={index} className="book">
                            <h2 className="bookName">Book name: </h2>
                            <h3 className="name">{book.title}</h3>
                            <h3 className="bookAuthor">Author name: </h3>
                            <p className="author">{book.author_name ? book.author_name.join(', ') : 'No author available'}</p>
                            <button onClick={() => removeFromBookshelf(index)} className="removeButton">Remove from Bookshelf</button>
                        </div>
                    ))
                ) : (
                    <p className="pTagBookshelf">No books in your bookshelf</p>
                )}
            </div>
        </div>
    );
}
