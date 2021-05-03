import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './addComment.css'
import config from '../config'

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: '',
                touched: false
            },
            comment: {
                value: '',
                touched: false
            },
            peakData: {}
        }
    }
    
    componentDidMount() {
        const baseUrl = `${config.API_ENDPOINT}`
        const peakId = (this.props.match.params.id)

        fetch(`${baseUrl}/peaks/${peakId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                peakData: data,
                error: null
            })
        })
        .catch(err => {
            this.setState({
                error: `Sorry, there's been an error retrieving peak data. Try again later.`
            })
        })
    }
        
    handleSubmit = e => {
        const ID = (this.state.peakData.id)
        
        e.preventDefault()
        const newComment = {
            username: e.target['usernameInput'].value,
            comment: e.target['commentInput'].value,
            peak_id: ID
        }

        fetch(`${config.API_ENDPOINT}/comments/${ID}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(comment => {
            this.props.history.push(`/peaks/${ID}`)
        })
        .catch(error => {
            console.error({error})
        })
    }

    updateUsername(username) {
        this.setState({username: {value: username, touched: true}});
    }

    updateComment(comment) {
        this.setState({comment: { value: comment, touched: true}})
    }

    render() {
        const ID = (this.state.peakData.id )

        return (
            <div className="addCommentContainer">
                <div className="addComment">
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="thumbTitle">Sign {this.state.peakData.peakname} Summit Register</h3>
                        <div className="peakLinks">
                            <Link to={`/peaks/${ID}`}className="back">Back</Link>
                        </div>
                        
                        <label htmlFor="usernameInput" className="formElement">Name: </label>
                        <input 
                            type="text"
                            id="usernameInput"
                            name="usernameInput"
                            onChange={e => this.updateUsername(e.target.value)}
                            aria-label="usernameInput"
                            aria-required="true"
                        />
                        
                        <label htmlFor="commentInput" className="formElement">Comment:</label>
                        <textarea
                            id="commentInput"
                            name="commentInput"
                            onChange={e => this.updateComment(e.target.value)}
                            aria-label="commentInput"
                            aria-required="true"
                        ></textarea>

                        <input type="submit" className="formElement submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddComment

