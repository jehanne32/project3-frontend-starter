import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'

class OnePolitician extends React.Component {
    constructor(props) {
        super()
        this.state = {
            candidate: {},
            newComment: {
                your_name: '',
                comment: '',
                candidate_id: props.match.params.candidateID
            },
            updateComment: {
                your_name: '',
                comment: '',
                candidate_id: props.match.params.candidateID
            }
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
    createComment = e => {
        e.preventDefault()
        if (this.state.newComment.your_name && this.state.newComment.comment) {
            axios({
                url: `${databaseUrl}/comments`,
                method: 'post',
                data: this.state.newComment
            })
                .then(response => {
                    this.getCandidate()
                })
        } else {
            alert("Input failure");
        }
    }
    handleCommentCreateChange = e => {
        let newComment = {
            [e.target.name]: e.target.value
        }
        this.setState((prevState, currentState) => (
            { newComment: { ...prevState.newComment, ...newComment } }
        ))
    }

    handleCommentUpdateChange = e => {
        let updateComment = {
            [e.target.name]: e.target.value
        }
        this.setState((prevState, currentState) => (
            { updateComment: { ...prevState.updateComment, ...updateComment } }
        ))
    }
    deleteComment = e => {
        e.preventDefault()
        let commentToDeleteId = e.target.id
        axios({
            url: `${databaseUrl}/comments/${commentToDeleteId}`,
            method: 'delete'
        })
            .then(response => {
                this.getCandidate()
            })
        let btns = document.querySelectorAll('.editForm');
        btns.forEach(item => {
            item.className = "noDisplay";
        })
    }
    editComment = e => {
        e.preventDefault()
        let name = e.target.className
        e.target.className = "noDisplay";
        let form = document.querySelectorAll(`.${name}`);
        form.forEach(item => {
            item.className = `${name}`;
        })
    }
    updateComment = e => {
        e.preventDefault()
        let commentToUpdateId = e.target.id
        axios({
            url: `${databaseUrl}/comments/${commentToUpdateId}`,
            method: 'put',
            data: this.state.updateComment
        })
            .then(response => {
                this.getCandidate()
            })
        let btns = document.querySelectorAll('.editForm');
        btns.forEach(item => {
            item.className = "noDisplay";
        })
    }
    renderViews = () => {
        return this.state.candidate.Viewpoints.map(viewpoint => {
            return <div key={viewpoint.id + 13} id={viewpoint.id + 13} className="viewpoint">
                <div className="viewpoint-small">
                    <h4>{viewpoint.category}: </h4>
                    <h4 id="forAgainst">{viewpoint.for_against}</h4>
                    <button className="button" onClick={() => { this.showEV(viewpoint.id + 13) }}>Read More</button>
                </div>
                <div>
                    <p className="hide EV">{viewpoint.expanded_view}</p>
                </div>                
            </div>
        })
    }
    renderComments = () => {
        return this.state.candidate.Comments.map(comment => {
            let nameJoined = comment.your_name.split(" ").join('')
            return <div key={comment.id + 23} className="comments">
                <h5>{comment.your_name}</h5>
                <p>{comment.comment}</p>
                <button className={`${nameJoined}`} id={comment.id} onClick={this.editComment}>Edit</button>
                <form className={`noDisplay editForm ${nameJoined}`} id={comment.id} onChange={e => this.handleCommentUpdateChange(e)}>
                    <label>Updated Username:
                        <input type="text" name="your_name" />
                    </label><br />
                    <label>Updated Comment:
                        <textarea type="text" name="comment" />
                    </label>
                </form>
                <button className={`noDisplay editForm ${nameJoined}`} id={comment.id} onClick={this.updateComment}>UPDATE</button>{' '}
                <button className={`noDisplay editForm ${nameJoined}`} id={comment.id} onClick={this.deleteComment}>DELETE</button>
            </div>
        })
    }

    render() {
        let politician = this.state.candidate
        let background = politician.Background
        console.log(this.state.candidate)

        if (politician.Background && politician.Viewpoints && politician.Comments) {
            return (
                <div className="politician">
                    <nav className="nav">
                        <Link to="/allpoliticians" className="polbutton">Candidates</Link>
                    </nav>
                    <iframe className="video" width="650" height="543" src={politician.candidate_img_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div id="bio">
                        <h1>{politician.name}</h1>
                        <h3>Current Office Held: {politician.current_office}</h3>
                        <a href={politician.official_website} target="_blank" rel="noopener noreferrer">Visit Campaign Website</a>
                        <h4>Birthplace: {background.place_of_birth}</h4>
                        <h4>Education: {background.education}</h4>
                        <h4>Family: {background.family}</h4>
                        <h4>Previous Offices Held: {background.offices_held}</h4>
                        <h4>Legislation Created: {background.legislation}</h4>
                    </div>
                    <div className="politician">
                        <h3>Viewpoints</h3>
                        {this.renderViews()}
                    </div>
                    <form id="commentForm" onSubmit={this.createComment} onChange={e => this.handleCommentCreateChange(e)}>
                        <label>Username:</label>
                        <input id="userInput" type="text" name="your_name" />
                        <br />
                        <label>Comment:</label>
                        <textarea rows="8" id="commentInput" type="text" name="comment" />
                        <input id="commentSubmit" type="submit" value="Submit" />
                    </form>
                    <div id="comments-flexbox">
                        {this.renderComments()}
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