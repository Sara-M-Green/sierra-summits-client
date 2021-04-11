import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './addComment.css'

class AddComment extends Component {
    render() {
        return (
            <div className="addComment">
                <form>
                    <h3>Sign Smith Mountain Summit Register</h3>
                    <label htmlFor="name" className="formElement">Name: </label>
                    <input 
                        type="text"
                        id="name"
                    />

                    <label htmlFor="date" className="formElement">Date: </label>
                    <input 
                        type="text"
                        id="date"
                    />

                    <label htmlFor="comment" className="formElement">Comment:</label>
                    <textarea></textarea>

                    <input type="submit" className="formElement" />
                </form>

                <div className="peakLinks">
                    <Link to="/peaks/smith" className="peakLinks">Back</Link>
                </div>
            </div>
        )
    }
}

export default AddComment