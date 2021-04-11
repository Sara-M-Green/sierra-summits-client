import React, { Component } from 'react' 
import { Link } from 'react-router-dom'
import './navbar.css'


class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/">
                    <h1 className="nav-title">Sierra Summits</h1>
                </Link>
                
            </ div>
        )
    }
}

export default Navbar