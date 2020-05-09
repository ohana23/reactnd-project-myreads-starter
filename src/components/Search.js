import Book from './Book.js';
import * as BooksAPI from '../BooksAPI';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        books: [],
        queryInput: '',
        success: false
    };

    getBooks = e => {
        let input = e.target.value;
        this.setState({ queryInput: input })

        if (input) {
            BooksAPI.search(input, 20).then(result => {
                if (result.length > 0) {
                    result = this.changeBookshelfToUserShelf(result);
                    this.setState({ books: result, success: true });
                } else {
                    this.setState({ books: [], success: false });
                }
            });
        } else {
            this.setState({ books: [], success: false });
        }
    }

    // If a book appears in a search result and it's already in one of 
    // the user's shelves, its select component should be set to "read", 
    // "wantToRead", or "currentlyReading". If not, it should default to
    // "none".
    changeBookshelfToUserShelf = (results) => {
        for (let i = 0; i < results.length; i++) {
            if (results[i].shelf === undefined) { 
                results[i].shelf = "none"; 
            }

            let matchingBook = this.props.books.find(b => b.id === results[i].id);
            if (matchingBook) {
                results[i].shelf = matchingBook.shelf;
            }
        }

        return results;
    }

    handleShelfChange = (book, shelf) => {
        this.props.onShelfChanged(book, shelf);
    }

    render () {
        const { queryInput, books, success } = this.state;

        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
              <div className="search-books-input-wrapper">
                <input 
                   type="text" 
                   placeholder="Search by title or author"
                   value={queryInput}
                   onChange={this.getBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              {books.length > 0 && (
                <div>
                    <h2>Showing {books.length} matches for <span className="color-green">{queryInput}</span>.</h2>
                    <ol className="books-grid">
                        {books.map(b => (
                            <Book
                                key={b.id}
                                book={b}
                                onShelfChanged={this.handleShelfChange}
                            />
                        ))}
                    </ol>
                </div>
              )}
                {!success && (<span><h2>Try searching one of the following terms. <span role="img" aria-label="detective searching emoji">🕵️‍♂️</span></h2>
                <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 
                    'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 
                    'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 
                    'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 
                    'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
                    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 
                    'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 
                    'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 
                    'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 
                    'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 
                    'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 
                    'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p></span>)}
            </div>
          </div>
        );
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
}

export default Search;