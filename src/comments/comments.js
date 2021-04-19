import React, { Component } from 'react'
import moment from 'moment'
import './comments.css'

class Comments extends Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-info">{moment(this.props.date).format('MMMM Do YYYY - h:mm a')}</p>
                <p className="comment-info">{this.props.name}</p>
                <p className="comment-info">{this.props.comment}</p>
            </div>
        )
    }
}

export default Comments