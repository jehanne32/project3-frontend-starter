import React from 'react';
import './App.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';
import axios from 'axios';
import AllPoliticians from './AllPoliticians';
import OnePolitician from './OnePolitician';
// import Home from './Home.js';
// import AllPoliticians from './AllPoliticians.js';
// import OnePolitician from './OnePolitician.js';
const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'

class App extends React.Component {

  render() {
    console.log(this.state)
    console.log("Rendered")
    return (
      <Router basename='/'>
        <nav></nav>
        <div className="App" >
          {(this.state.politicians) ?
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/allpoliticians" component={AllPoliticians}/>
            <Route exact path="/onepolitician" component={OnePolitician}/>
          </div> 
        : <Route exact path="/" component={Home}/> }
        </div>
      </Router>
    );
  }
}

export default App;
