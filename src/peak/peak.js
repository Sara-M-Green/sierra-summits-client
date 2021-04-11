import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from '../register/register'
import './peak.css'

class Peak extends Component {
    render() {
        return (
            <div>
                <h1>Smith Mountain</h1>
                <div className="peakLinks">
                    <Link to="/peaks" className="peakLinks">Back</Link>
                </div>
                <p>Elevation: 9515 ft</p>
                <p>36.12750°N / 118.20778°W</p>
                <p>Trailhead: SNF 21S36</p>
                <p>Smith Mountain is on the Kern Plateau, near Kennedy Meadows. The highpoint of about half dozen small peaks in the area surrounded by pine forests and lush meadows, Smith is probably the most climbed of the lot. The peak is mostly tree covered, but the summit is topped by a small granite formation that requires some class II scrambling on excellent rock covered with pretty lichen.</p>
                <p>This is one of the less visited parts of the sierra. Probably the most common users of the area are the motorcyclists. There are hundreds of miles of trails open to them on the Kern Plateau and you will occasionally here them motoring through the forest.</p>
                <div className="peakLinks">
                    <Link to="/peaks/smith/comment" className="peakLinks" >Sign Summit Register</Link>
                </div>
                <Register />
            </div>
        )
    }
}

export default Peak