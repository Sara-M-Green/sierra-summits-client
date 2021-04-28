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
            error: null
        }
    }

    componentDidMount() {
        const baseUrl = `${config.API_ENDPOINT}/comments`
        const peakId = (this.props.match.params.id)

        const url = `${baseUrl}/${peakId}`
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
    }

    render() {
        const ID = (this.props.match.params.id - 1)

        return (
            <div>
                <h1>{this.props.store[ID].peakname}</h1>
                <div className="peakLinks">
                    <Link to="/api/peaks" className="peakLinks">Back</Link>
                </div>
                <img src={this.props.store[ID].image} alt="peak" />
                <p>Elevation: {this.props.store[ID].summit} ft</p>
                <p>{this.props.store[ID].latlong}</p>
                <p>Trailhead: {this.props.store[ID].trailhead}</p>
                <p>{this.props.store[ID].overview}</p>
                <p>{this.props.store[ID].route}</p>
                <div className="peakLinks">
                    <Link to={`${this.props.match.params.id}/comment`} className="peakLinks" >Sign Summit Register</Link>
                </div>
                <Register store={this.props.store} comments={this.state.comments}/>
            </div>
        )
    }
}

export default Peak