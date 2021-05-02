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
            }
        }
    }
    
        
    handleSubmit = e => {
        const ID = (this.props.match.params.id)
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
            this.props.history.push(`/api/peaks/${comment.peak_id}`)
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

    // validateUsername() {
    //     const username = this.state.username.value.trim();
    //     if (username.length === 0) {
    //         return "Name required"
    //     }
    // }

    // validateComment() {
    //     const comment = this.state.comment.value.trim();
    //     if (comment.length === 0) {
    //         return "Comment required"
    //     }
    // }
    render() {
        const ID = (this.props.match.params.id - 1)

        // const usernameError = this.validateUsername()
        // const commentError = this.validateComment()

        return (
            <div className="addCommentContainer">
                <div className="addComment">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign {this.props.store[ID].peakname} Summit Register</h3>
                        <div className="peakLinks">
                            <Link to={`/api/peaks/${ID + 1}`}className="peakLinks">Back</Link>
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

