import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from '../register/register'
import './peak.css'

class Peak extends Component {
    render() {
        const ID = (this.props.match.params.id - 1)

        return (
            <div>
                <h1>{this.props.store[ID].peakname}</h1>
                <div className="peakLinks">
                    <Link to="/api/peaks" className="peakLinks">Back</Link>
                </div>
                <img src={this.props.store[ID].image} />
                <p>Elevation: {this.props.store[ID].summit} ft</p>
                <p>{this.props.store[ID].latLong}</p>
                <p>Trailhead: {this.props.store[ID].trailHead}</p>
                <p>{this.props.store[ID].overview}</p>
                <p>{this.props.store[ID].route}</p>
                <div className="peakLinks">
                    <Link to={`${this.props.match.params.id}/comment`} className="peakLinks" >Sign Summit Register</Link>
                </div>
                <Register store={this.props.store}/>
            </div>
        )
    }
}

export default Peak