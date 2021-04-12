import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from '../register/register'
import './peak.css'

class Peak extends Component {
    render() {
        const ID = (this.props.match.params.id - 1)

        return (
            <div>
                <h1>{this.props.store.peaks[ID].name}</h1>
                <div className="peakLinks">
                    <Link to="/peaks" className="peakLinks">Back</Link>
                </div>
                <p>Elevation: {this.props.store.peaks[ID].summit} ft</p>
                <p>{this.props.store.peaks[ID].location}</p>
                <p>Trailhead: {this.props.store.peaks[ID].trailhead}</p>
                <p>{this.props.store.peaks[ID].overview}</p>
                <p>{this.props.store.peaks[ID].route}</p>
                <div className="peakLinks">
                    <Link to="/peaks/smith/comment" className="peakLinks" >Sign Summit Register</Link>
                </div>
                <Register />
            </div>
        )
    }
}

export default Peak