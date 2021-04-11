import React, { Component } from 'react'
import Comments from '../comments/comments'
import './register.css'

class Register extends Component {
    render() {
        return (
            <div className="register">
                <h2>SUMMIT REGISTER</h2>
                <Comments />
                <Comments />
                <Comments />
            </div>
        )
    }
}

export default Register