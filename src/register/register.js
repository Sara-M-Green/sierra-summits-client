import React, { Component } from 'react'
import Comments from '../comments/comments'
import './register.css'

class Register extends Component {
    render() {
        return (
            <div className="register">
                <h2>SUMMIT REGISTER</h2>
                {this.props.store.comments.map(comment => (
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