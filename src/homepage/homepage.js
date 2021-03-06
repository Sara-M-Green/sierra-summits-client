import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'


class Homepage extends Component {
    render() {
        return (
            <div>
                <div  className="homepageText">
                    <p>Sierra Summits is an online summit register.</p>
                    <p>It allows users to access information on the 247 SPS peaks throughout the Sierra Nevada mountain range.</p>
                    <p>Users can sort and filter peaks based on milage, elevation or class.</p>
                    <p>After summiting a peak, users can sign the online summit register or leave comments for other users on trail conditions.</p>
                    <Link className='Link' to='/peaks'>
                        <button className="btn">Adventure Awaits!</button>
                    </Link>    
                </div>
                
                
            </div>
        )
    }
}

export default Homepage