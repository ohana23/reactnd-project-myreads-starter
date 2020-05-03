import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    state = { value: 'read' };

    handleShelfChange = event => {
        this.setState({ value: event.target.value });
        this.props.onShelfChanged([this.props.title, event.target.value])
    }

    render() {
        const { title, authors, coverImage } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                    style={{ 
                        width: 128, 
                        height: 193, 
                        backgroundImage: `url(${coverImage})`}}>
                </div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleShelfChange} value={this.state.value}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>

                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join(', ')}</div>
            </div>
        );
    }
}

Book.propTypes = {
    booksInShelf: PropTypes.array,
    onShelfChanged: PropTypes.func.isRequired
  }

export default Book;