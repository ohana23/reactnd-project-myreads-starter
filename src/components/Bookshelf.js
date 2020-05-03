import React, { Component } from 'react';
import BookList from './BookList.js';

class Bookshelf extends Component {
    render() {
        const { booksInShelf, title, onShelfChanged } = this.props;
        // const booksInShelf = [];
        // const shelfName = name;
        
        // Add books that belong to the current shelf.
        // allBooks.forEach((book) => {
        //   if (book.shelf === shelfName) {
        //     booksInShelf.push(book);
        //   }
        // })

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

export default Bookshelf;