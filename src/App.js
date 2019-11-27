import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AllPoliticians from "./AllPoliticians";
import OnePolitician from "./OnePolitician";
import Home from './Home.js';

class App extends React.Component {
  render() {
    console.log("Rendered");
    return (
      <Router basename="/">
        <div className="App">
          <div id="title">
            <h1>Voter's Digest</h1>
          </div>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/allpoliticians" component={AllPoliticians} />

            <Route exact path="/onepolitician/:candidateID" component={OnePolitician} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;