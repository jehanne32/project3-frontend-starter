import React from 'react';
import axios from 'axios';
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
        axios({
            url: `${databaseUrl}/comments`,
            method: 'post',
            data: this.state.newComment
        })
            .then(response => {
                this.getCandidate()
            })
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
        document.getElementById("edit").className = "";
        let btns = document.querySelectorAll('.editFn');
        btns.forEach(item => {
            item.className = "noDisplay editFn";
        })
    }
    editComment = e => {
        e.preventDefault()
        document.getElementById("edit").className = "noDisplay";
        let btns = document.querySelectorAll('.editFn');
        btns.forEach(item => {
            item.className = "editFn";
        })
    }
    updateComment = e => {
        e.preventDefault()
        let commentToUpdateId = e.target.id
        console.log(commentToUpdateId)
        axios({
            url: `${databaseUrl}/comments/${commentToUpdateId}`,
            method: 'put',
            data: this.state.updateComment
        })
            .then(response => {
                this.getCandidate()
            })
        document.getElementById("edit").className = "";
        let btns = document.querySelectorAll('.editFn');
        btns.forEach(item => {
            item.className = "noDisplay editFn";
        })
    }

    render() {
        let politician = this.state.candidate
        let background = politician.Background
        console.log(this.state.candidate)
        console.log(this.state.updateComment)

        if (politician.Background && politician.Viewpoints && politician.Comments) {
            let renderViews = politician.Viewpoints.map(viewpoint => {
                return <div key={viewpoint.id + 13} id={viewpoint.id + 13} className="viewpoint">
                    <h4>{viewpoint.category}: {viewpoint.for_against}</h4>
                    <button className="button" onClick={() => {this.showEV(viewpoint.id + 13)}}>Read More</button>
                    <p className="hide EV">{viewpoint.expanded_view}</p>
                </div>
            })
            let renderComments = politician.Comments.map(comment => {
                return <div key={comment.id + 23} className="comments">
                    <h5>{comment.your_name}</h5>
                    <p>{comment.comment}</p>
                    <button id="edit" onClick={this.editComment}>Edit</button>
                    <form className="noDisplay editFn" id={comment.id} onChange={e => this.handleCommentUpdateChange(e)}>
                        <label>Updated Username:</label>
                        <input type="text" name="your_name" />
                        <label>Updated Comment:</label>
                        <textarea type="text" name="comment" />
                    </form>
                    <button className="noDisplay editFn" id={comment.id} onClick={this.updateComment}>UPDATE</button>{' '}
                    <button className="noDisplay editFn" id={comment.id} onClick={this.deleteComment}>DELETE</button>
                </div>
            })

            return (
            <div>
                    <iframe className="video" width="750" height="500" src={politician.candidate_img_url} 
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>
                    <div>
                        <h2>{politician.name}</h2>
                        <a href={politician.official_website} target="_blank" rel="noopener noreferrer">Visit Campaign Website</a>
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
                    <form onSubmit={this.createComment} onChange={e => this.handleCommentCreateChange(e)}>
                        <label>Username:</label>
                        <input type="text" name="your_name" />
                        <label>Comment:</label>
                        <textarea type="text" name="comment" />
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        {renderComments}
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