import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './thumbnail.css'

class Thumbnail extends Component {
    render() {
        return (
            <div className="thumbnail">
                <Link to={`/peaks/${this.props.id}`} className="Link"><h2>{this.props.name}</h2></Link>
                <p>{this.props.miles}</p>
                <p>Class {this.props.class}</p>
                <p>Elevation Gain: {this.props.elevation_gain} ft</p>
            </div>
            
        )
    }
}

export default Thumbnail
