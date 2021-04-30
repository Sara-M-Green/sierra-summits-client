import React, { Component } from 'react'
import Comments from '../comments/comments'
import { Link } from 'react-router-dom'
import './register.css'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }
    render() {
        return (
            <div className="register">
                <h2>SUMMIT REGISTER</h2>
                <div className="summitreg">
                <Link to={`${this.props.id}/comment`} id="peakLinks" >Sign Summit Register</Link>

                </div>
                {this.props.comments.map(comment => (
                    <Comments 
                        key={comment.id}
                        date={comment.date_commented}
                        name={comment.username}
                        comment={comment.comment}
                    />
                ))}
            </div>
        )
    }
}

export default Register