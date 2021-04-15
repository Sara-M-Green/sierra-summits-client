import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './thumbnail.css'

class Thumbnail extends Component {
    render() {
        return (
            <div className="thumbnail">
                <Link to={`/api/peaks/${this.props.id}`} className="Link"><h2>{this.props.peakname}</h2></Link>
                <p>{this.props.miles} Miles</p>
                <p>Class {this.props.class}</p>
                <p>Elevation Gain: {this.props.elevation_gain} ft</p>
            </div>
            
        )
    }
}

export default Thumbnail
