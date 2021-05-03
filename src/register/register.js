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
                <div className="registerContent">
                    <h2>SUMMIT REGISTER</h2>

                    <div className="center signBtn">
                        <Link to={`${this.props.id}/comment`} className="sign" >Sign!</Link>
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
            </div>
        )
    }
}

export default Register