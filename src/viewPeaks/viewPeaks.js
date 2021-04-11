import React, { Component } from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'

class ViewPeaks extends Component {
    render() {
        return (
            <div>
                <h1>SPS Peak List</h1>
                <section className="slidecontainer">
                    <div >
                        <label>Filter By Max Mileage</label>
                        <input type="range" min="1" max="100" className="slider" id="myRange" />
                    </div>
                    <div>
                        <label>Filter By Max Elevation Gain</label>
                        <input type="range" min="1" max="100" className="slider" id="myRange" />
                    </div>
                    <div>
                        <label htmlFor="class1">Class: 1</label>
                        <input type="checkbox" id="class1" name="class1" value="1" />
                        
                        <label htmlFor="class2">2</label>
                        <input type="checkbox" id="class2" name="class2" value="2" />
                        
                        <label htmlFor="class3">3</label>
                        <input type="checkbox" id="class3" name="class3" value="3" />
                        
                        <label htmlFor="class4">4</label>
                        <input type="checkbox" id="class4" name="class4" value="4" />
                        
                        <label htmlFor="class5">5</label>
                        <input type="checkbox" id="class5" name="class5" value="5" />
                        

                    </div>
                </section>
                <Thumbnail />    
                <Thumbnail />    
                <Thumbnail />    
            </div>
            
        )
    }
}

export default ViewPeaks


