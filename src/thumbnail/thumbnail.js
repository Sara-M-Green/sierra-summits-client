import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './thumbnail.css'

class Thumbnail extends Component {
    render() {
        return (
            <div className="thumbnail">
                <Link to="/peaks/smith"><h2>Smith Mountain</h2></Link>
                <p>1.4 Miles</p>
                <p>Class 2</p>
                <p>Elevation Gain: 995 ft</p>
            </div>
            
        )
    }
}

export default Thumbnail
