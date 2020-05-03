import React from 'react';
import BooksApp from './components/BooksApp.js';
import Search from './components/Search.js';
import './App.css';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksApp />
        )} />
        <Route 
          path="/search" 
          component={Search} />
      </div>
    )
  }
}

export default App;

