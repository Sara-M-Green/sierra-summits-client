import React, { Component } from 'react'
import Comments from '../comments/comments'
import './register.css'
import STORE from '../store'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: STORE,
        }
    }
    render() {
        return (
            <div className="register">
                <h2>SUMMIT REGISTER</h2>
                {this.state.comments.comments.map(comment => (
                    <Comments 
                        key={comment.id}
                        date={comment.date}
                        name={comment.name}
                        comment={comment.comment}
                    />
                ))}
            </div>
        )
    }
}

export default Register