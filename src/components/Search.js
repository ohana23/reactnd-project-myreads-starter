import Book from './Book.js';
// import BooksAPI from '../BooksAPI.js'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
    state = {
        books: [],
        input: '',
        showError: false
    };

    render () {

        const { input, books, showError } = this.state;

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
                   value={input}
                   onChange={this.getBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              {books.length > 0 && (
                <div>
                  <ol className="books-grid">
                    <Book />
                  </ol>
                </div>
              )}
                {showError && (<h1>no books by this criteria</h1>)}
            </div>
          </div>
        );
    }
}

export default Search;