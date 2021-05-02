import React, { Component } from 'react'
import moment from 'moment'
import './comments.css'

class Comments extends Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-info"><strong>{moment(this.props.date).format('MMMM Do YYYY - h:mm a')}</strong></p>
                <p className="comment-info"><strong>Name:</strong> {this.props.name}</p>
                <p className="comment-info"><strong>Comment:</strong> {this.props.comment}</p>
            </div>
        )
    }
}

export default Comments