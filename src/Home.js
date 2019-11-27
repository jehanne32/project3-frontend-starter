import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <nav className="nav">
                    <Link to="/allpoliticians" className="polbutton">Candidates</Link>
                </nav>
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
        )
    }
}

export default Home
