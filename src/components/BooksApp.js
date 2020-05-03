import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Bookshelf from './Bookshelf.js';
import { Link } from 'react-router-dom';

class BooksApp extends Component {
  
  state = {
    allBooks: []
  }

  // Extract only necessary data from returned api books to create a new array.
  async createBooksArray() {
    let allBooks = []

    let response = await BooksAPI.getAll()

    response.forEach(b => {
      allBooks.push({
        title: b.title,
        authors: b.authors,
        coverImage: b.imageLinks.smallThumbnail,
        shelf: b.shelf
      })
    })

    return allBooks
  }


  async componentDidMount() {
    let books = await this.createBooksArray()

    this.setState({
      allBooks: books
    })
  }


//   componentDidMount() {
//     BooksAPI.getAll().then(allBooks => 
//         this.setState({ allBooks })
//     );
//   }

  // TODO: I somehow have to use the api to update the state (I think).
  // Not sure how a spread operator is supposed to handle that.
  // Or if i have to get the book and new shelf, pass both to the api, then 
  // somehow use the response to set the new state?
//   handleShelfChange = value => {
//     console.log(this.state)
    
//     let bookToMove = value[0]
//     let shelfToMoveTo = value[1]
//     let books = this.state.allBooks
    
//     console.log(BooksAPI.update(bookToMove, shelfToMoveTo))
    
//     books.forEach(b => {
//       if (b.title === bookToMove) {
//         console.log(b.title)
//       }
//     })
//   }

  handleShelfChange = value => {
    console.log(this.state.allBooks);

    let bookToMove = value[0];
    let targetShelf = value[1];
    let books = this.state.allBooks;

    // Creates books array needed to update the state.
    // books.forEach(b => {
    //     if (b.title === bookToMove) {
    //         console.log(b.title + " = " + bookToMove);
    //     }
    // })

    let newBooks = books.filter(function(book) {
        return book.title !== bookToMove;
    })

    // newBooks.concat()

    console.log(newBooks);

    this.setState(prevState => ({
        allBooks: [ ...prevState.allBooks, ...newBooks]
    }))

    console.log(bookToMove + " to " + targetShelf);
    BooksAPI.update(bookToMove, targetShelf);
  }
  
  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf 
              title="Currently Reading"
              name="currentlyReading"
              allBooks={this.state.allBooks}
              onShelfChanged={this.handleShelfChange}
            />
            <Bookshelf 
              title="Want to Read"
              name="wantToRead"
              allBooks={this.state.allBooks}
              onShelfChanged={this.handleShelfChange}
            />
            <Bookshelf 
              title="Read"
              name="read"
              allBooks={this.state.allBooks}
              onShelfChanged={this.handleShelfChange}
            />
          </div>
        </div>
          
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>

      </div>
    )
  }
}

export default BooksApp;