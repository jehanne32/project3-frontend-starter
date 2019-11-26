import React from 'react';
import axios from 'axios';
const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'

class OnePolitician extends React.Component {
    constructor(props) {
        super()
        this.state = {
            candidate: {}
        }
    }

    componentDidMount() {
        this.getCandidate()
    }

    getCandidate = (props) => {
        axios({
            url: `${databaseUrl}/candidates/${this.props.match.params.candidateID}`,
            method: 'get'
        })
            .then(response => {
                console.log(response)
                this.setState({ candidate: response.data })
            })
    }
    showEV = (id) => {
        let vp = document.getElementById(id);
        let p = vp.querySelector('p');
        let btn = vp.querySelector('button');
        btn.className = "hide";
        p.className = "EV";

    }

    render() {
        let politician = this.state.candidate
        let background = politician.Background
        console.log(this.state.candidate)

        if (politician.Background && politician.Viewpoints) {
            let renderViews = politician.Viewpoints.map(viewpoint => {
                return <div key={viewpoint.id + 13} id={viewpoint.id + 13} className="viewpoint">
                    <h4>{viewpoint.category}: {viewpoint.for_against}</h4>
                    <button className="button" onClick={() => {this.showEV(viewpoint.id + 13)}}>Read More</button>
                    <p className="hide EV">{viewpoint.expanded_view}</p>
                </div>
            })
            return (
                <div className="politician">
                    <img src={politician.candidate_img_url} alt='' />
                    <div>
                        <h2>{politician.name}</h2>
                        <a href={politician.official_website}>Visit Campaign Website</a>
                        <h3>Current Office Held: {politician.current_office}</h3>
                        <h4>Birthplace: {background.place_of_birth}</h4>
                        <h4>Education: {background.education}</h4>
                        <h4>Family: {background.family}</h4>
                        <h4>Previous Offices Held: {background.offices_held}</h4>
                        <h4>Legislation Created: {background.legislation}</h4>
                    </div>
                    <div>
                        <h3>Viewpoints</h3>
                        {renderViews}
                    </div>
                </div>
            )
        }
        else {
            return (
                <h4>Loading! ...</h4>
            )
        }
    }
}

export default OnePolitician