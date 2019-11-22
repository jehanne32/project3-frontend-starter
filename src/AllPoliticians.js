import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'

class AllPoliticians extends React.Component {
    state = {
        candidates: []    
    }

    componentDidMount() {
        this.getCandidates()
    }

    getCandidates = () => {
        axios({
            url: `${databaseUrl}/candidates`,
            method: 'get'
        })
            .then(response => {
                this.setState({ candidates: response.data.candidates })
            })
    }

    render() {
        console.log(this.state.candidates)
        let tempCandid = this.state.candidates.map(candidate => {
            return <div key={candidate.id}>
                <Link to={`/onepolitician/${candidate.id}`}>
                    <img className="CandidateImages" src={`images/${candidate.id}.png`} alt="" />
                    <h3>{candidate.name}</h3>
                </Link>
                <h4>{candidate.party}</h4>
            </div>
        })

        return (
            <div>
                    {tempCandid}
            </div>
        )
    }
}

export default AllPoliticians