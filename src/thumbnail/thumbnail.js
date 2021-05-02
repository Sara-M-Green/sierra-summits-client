import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './thumbnail.css'

class Thumbnail extends Component {
    render() {
        return (
            <div className="thumbnail">
                <Link to={`/api/peaks/${this.props.id}`} className="Link thumbTitle"><h3>{this.props.peakname}</h3></Link>
                <p>{this.props.miles} Miles - One Way</p>
                <p>Class {this.props.class}</p>
                <p>Elevation Gain: {this.props.elevation_gain} ft</p>
            </div>
        )
    }
}

export default Thumbnail
