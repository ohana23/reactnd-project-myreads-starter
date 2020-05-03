import React, { Component } from 'react';
import BookList from './BookList.js';

class Bookshelf extends Component {
    render() {

        const booksInShelf = []
        const shelfName = this.props.name
        
        // Add books that belong to the current shelf.
        this.props.allBooks.forEach((book) => {
          if (book.shelf === shelfName) {
            booksInShelf.push(book)
          }
        })

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <BookList 
                  booksInShelf={booksInShelf}
                  onShelfChanged={this.props.onShelfChanged}
                />
              </div>
            </div>
          );
    }
}

export default Bookshelf;