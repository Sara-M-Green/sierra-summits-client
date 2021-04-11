import React, { Component } from 'react'
import './comments.css'

class Comments extends Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-info">04/01/2021</p>
                <p className="comment-info">Ben</p>
                <p className="comment-info">Beautiful hike! Trail is snow free all the way to the summit.</p>
            </div>
        )
    }
}

export default Comments