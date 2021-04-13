import React, { Component } from 'react'
import './comments.css'

class Comments extends Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-info">{this.props.date}</p>
                <p className="comment-info">{this.props.name}</p>
                <p className="comment-info">{this.props.comment}</p>
            </div>
        )
    }
}

export default Comments