import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import './BookSearchPage.css';
import useBookInfo from "../../hooks/useBookInfo";
import { SearchContext } from "../../hooks/SearchContext";

export default function BookSearchPage() {
    const { query, setQuery, searchTerm, setSearchTerm, hasSearched, setHasSearched, results, setResults } = useContext(SearchContext);
    const searchResults = useBookInfo(searchTerm);

    useEffect(() => {
        if (hasSearched) {
            setResults(searchResults);
        }
    }, [searchResults, hasSearched, setResults]);

    useEffect(() => {
        document.title = "Personal Bookshelf";
    },[]);

    const handleSearch = () => {
        setSearchTerm(query);
        setHasSearched(true);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (hasSearched) {
            setHasSearched(false);
            setResults([]);
        }
    };

    const addToBookshelf = (book) => {
        const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        bookshelf.push(book);
        localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
        alert("Book added to bookshelf");
    };

    const filteredResults = Array.isArray(results)
        ? results.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className="searchPage">
            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter the book name"
                />
                <button
                    className="searchButton"
                    onClick={handleSearch}
                >Search</button>
                <Link to="/bookshelf" className="bookshelfLink">Go to Bookshelf</Link>
            </div>
            <div className="resultsContainer">
                {hasSearched && (
                    filteredResults.length > 0 ? (
                        filteredResults.map((book, index) => (
                            <div key={index} className="book">
                                <h2 className="bookName">Book name: </h2>
                                <h3 className="name">{book.title}</h3>
                                <h3 className="bookAuthor">Author name: </h3>
                                <p className="author">{book.author_name ? book.author_name.join(', ') : 'No author available'}</p>
                                <button onClick={() => addToBookshelf(book)} className="addButton">Add to Bookshelf</button>
                            </div>
                        ))
                    ) : (
                        <p className="pTagSearchPage">Please wait till the data gets fetched...</p>
                    )
                )}
            </div>
        </div>
    );
}
