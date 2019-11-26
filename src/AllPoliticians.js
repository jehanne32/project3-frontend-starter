import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const databaseUrl = process.env.HEROKU_DB_URL || "http://localhost:3000";

class AllPoliticians extends React.Component {
  state = {
    candidates: []
  };

  componentDidMount() {
    this.getCandidates();
  }

  getCandidates = () => {
    axios({
      url: `${databaseUrl}/candidates`,
      method: "get"
    }).then(response => {
      this.setState({ candidates: response.data.candidates });
    });
  };

  render() {
    console.log(this.state.candidates);
    let tempCandid = this.state.candidates.map(candidate => {
      return (
        <div key={candidate.id} className="pol">
          <Link to={`/onepolitician/${candidate.id}`}>
            <img
              className="CandidateImages"
              src={`images/${candidate.id}.png`}
              alt=""
            />
            <h3>{candidate.name}</h3>
          </Link>
          <h4>{candidate.party}</h4>
        </div>
      );
    });

    return (
      <div className="idiot">
        <h1>The Candidates</h1>
        <p>
          Here on the candidate’s page, you can click on either the candidate’s
          image or their name and a list will appear showing their positions on
          various major issues such as gun control, education and abortion.
        </p>
        <div className="canddiv">{tempCandid}</div>
      </div>
    );
  }
}

export default AllPoliticians;
