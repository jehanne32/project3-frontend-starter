import React from 'react';
import axios from 'axios';
// import klobuchar from '/image/klobuchar';

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
        console.log(candidate.name)
        return <h3 key={candidate.id}>{candidate.name}</h3>
        //   <div>
        //       <img className="CandidateImages" src="../public/images/blabla" alt=""><a href=""/></img>
        //   </div>
    })

    return (
        <div>
            {tempCandid}
            {/* <img src={klobuchar} alt="Amy Klobuchar" /> */}
        </div>
    )
}
}

export default AllPoliticians