import React from 'react';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';
import axios from 'axios';
// import Home from './Home.js';
// import AllPoliticians from './AllPoliticians.js';
// import OnePolitician from './OnePolitician.js';
const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'

class App extends React.Component {
  state = {
    polititians: []
  }

  componentDidMount() {
    this.getPoliticians()
  }

  getPoliticians = () => {
    axios({
      url: `${databaseUrl}/polititians`,
      method: 'get'
    })
      .then(response => {
        console.log(response)
        // this.setState({ polititians })
      })
  }

  render() {
    console.log(this.state)
    console.log("Rendered")
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Project 3 Starter. Let's git it!</h1>
        </header>
      </div>
    );
  }
}

export default App;
