import React, { Component } from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types';

class BookList extends Component {
  render() {
    const books = [];
    
    // Create a book object for each book that belongs in this list.
    this.props.booksInShelf.forEach((book) => {
      books.push(<li key={book.id}>
                    <Book
                        book={book}
                        onShelfChanged={this.props.onShelfChanged}
                    />
                </li>);
    });
    
    return (
      <ol className="books-grid">
        {books}
      </ol>
    )
  }
}

BookList.propTypes = {
  booksInShelf: PropTypes.array.isRequired,
  onShelfChanged: PropTypes.func.isRequired
}

export default BookList;