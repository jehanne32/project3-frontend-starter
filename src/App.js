import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AllPoliticians from './AllPoliticians';
// import OnePolitician from './OnePolitician';
// import Home from './Home.js';


class App extends React.Component {

  render() {
    console.log("Rendered")
    return (
      <Router basename='/'>
        
        <div className="App" >
          <div id="title">
            <h1>Voter's Digest</h1>
          </div>
          <nav className="nav">
          <Link to="/allpoliticians">Candidates</Link>
          </nav>
          <div>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/allpoliticians" component={AllPoliticians} />
          {/* <Route exact path="/onepolitician" component={OnePolitician} /> */}
          </div>
          <p className="para">Our aim is to provide a factual, nonpartisan app where 
          voters can access information about the Republican and Democratic candidates 
          for the 2020 United States presidential election.  Our visitors can access 
          information about candidates recent voting records, what offices they have 
          held, their positions on the key issues, links to the candidates websites 
          for in-depth learning on individuals and other important issues that will 
          enable voters to make an informed decision when choosing who to vote for.</p>

          <p className="para">We have designed our app to be to easy to use and understand. 
          If you have any questions about our app, please contact us.</p>

        </div>
      </Router>
    );
  }
}

export default App;
