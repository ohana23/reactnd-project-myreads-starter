import React from 'react';
// import BooksApp from './components/BooksApp.js';
import * as BooksAPI from './BooksAPI';
import Search from './components/Search.js';
import './App.css';
import { Route } from 'react-router-dom';
import Bookshelf from './components/Bookshelf.js';
import { Link } from 'react-router-dom';

class App extends React.Component {
  state = {
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => this.setState({allBooks}));
  }

  handleShelfChange = (bookToMove, targetShelf) => {
    let books = this.state.allBooks;

    // Find the index of the book to move...
    let bookIndex = books.findIndex(b => b.id === bookToMove.id )
    
    // ... and update that book's shelf while adding it to a new array.
    let newBooks = [...books];
    newBooks[bookIndex] = { ...newBooks[bookIndex], shelf: targetShelf }

    this.setState(() => ({
      allBooks: newBooks
    }))

    BooksAPI.update(bookToMove, targetShelf);
  }

  render() {

    let currentlyReadingBooks = this.state.allBooks.filter(b => b.shelf === "currentlyReading");
    let wantToReadBooks = this.state.allBooks.filter(b => b.shelf === "wantToRead");
    let readBooks = this.state.allBooks.filter(b => b.shelf === "read");

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  title="Currently Reading"
                  name="currentlyReading"
                  booksInShelf={currentlyReadingBooks}
                  onShelfChanged={this.handleShelfChange}
                />
                <Bookshelf 
                  title="Want to Read"
                  name="wantToRead"
                  booksInShelf={wantToReadBooks}
                  onShelfChanged={this.handleShelfChange}
                />
                <Bookshelf 
                  title="Read"
                  name="read"
                  booksInShelf={readBooks}
                  onShelfChanged={this.handleShelfChange}
                />
              </div>
            </div>

            <div className="open-search">
              <Link
                to="/search"
                ><button>Add a book</button></Link>
            </div>
            
          </div>
        )} />

        <Route path="/search" render={() => (
          <Search 
            books={this.state.allBooks}
            onShelfChanged={this.handleShelfChange} />
        )} />

      </div>
    )
  }
}

export default App;

