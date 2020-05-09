import React, { Component } from 'react';
import BookList from './BookList.js';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
    render() {
        const { booksInShelf, title, onShelfChanged } = this.props;

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <BookList 
                  booksInShelf={booksInShelf}
                  onShelfChanged={onShelfChanged}
                />
              </div>
            </div>
          );
    }
}

Bookshelf.propTypes = {
    booksInShelf: PropTypes.array,
    title: PropTypes.string.isRequired,
    onShelfChanged: PropTypes.func.isRequired
}

export default Bookshelf;