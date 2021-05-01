import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from '../register/register'
import config from '../config'
import './peak.css'

class Peak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            error: null,
            peakData: {}
        }
    }
    

    componentDidMount() {
        const baseUrl = `${config.API_ENDPOINT}`
        const peakId = (this.props.match.params.id)

        const url = `${baseUrl}/comments/${peakId}`
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    comments: data,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: `Sorry, there's been an error retrieving comments. Try again later.`
                })
            })
            fetch(`${baseUrl}/peaks/${peakId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    peakData: data,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: `Sorry, there's been an error retrieving peak data. Try again later.`
                })
            })

    }

    render() {
        
        const ID = (this.props.match.params.id - 1)
        console.log(this.props.match.params.id)
        console.log(this.state.peakData)
        return (
            <div>
                {/* <h1>{this.props.store[ID].peakname}</h1> */}
                <h1>{this.state.peakData.peakname}</h1>
                <div className="peakLinks">
                    <Link to="/api/peaks" className="peakLinks">Back</Link>
                </div>
                <img src={this.state.peakData.image} alt="peak" />
                <p>Elevation: {this.state.peakData.summit} ft</p>
                <p>{this.state.peakData.latlong}</p>
                <p>Trailhead: {this.state.peakData.trailhead}</p>
                <p>{this.state.peakData.overview}</p>
                <p>{this.state.peakData.route}</p>
                <div className="peakLinks">
                    {/* <Link to={`${this.props.match.params.id}/comment`} className="peakLinks" >Sign Summit Register</Link> */}
                </div>
                <Register store={this.props.store} id={this.props.match.params.id} comments={this.state.comments}/>
            </div>
        )
    }
}

export default Peak