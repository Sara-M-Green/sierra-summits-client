import React, { Component } from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'

class ViewPeaks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peaks: [],
            search: '',
            sort: '',
            error: null
        }
    }

    componentDidMount() {
        this.setState({
            peaks: this.props.store
        })
    }

    
    setSearch(search) {
        this.setState({
            search
        })
    }

    setSort(sort) {
        this.setState({
            sort
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const baseUrl = 'http://localhost:8000/api/peaks'
        const params = []
        if (this.state.search) {
            params.push(`search=${this.state.search}`)
        }
        if (this.state.sort) {
            params.push(`sort=${this.state.sort}`);
        }

        const query = params.join('&')
        const url = `${baseUrl}?${query}`

        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then(data => {
                this.setState({
                    peaks: data,
                    error: null
                })
            })
            .catch(err => {
                this.setState({
                    error: 'Sorry, could not find any peaks at this time'
                })
            })
    }
    
    render() {
        const peaks = this.state.peaks.map((peak, i) => {
            return <Thumbnail 
                {...peak} 
                key={i} 
                name={peak.peakName}
                miles={peak.mileage}
                id={peak.id}
                class={peak.class}
                elevation_gain={peak.gain}
            />
        })
        return (
            <div>
                <h1>SPS Peak List</h1>
                <section className="slidecontainer">
                    <div>
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
                    <div>
                        <form onSubmit={e => this.handleSubmit(e)}>
                            <label htmlFor="search">Search for peak by name:</label>
                            <input 
                                type="text" 
                                id="search" 
                                name="search"
                                value={this.state.search}
                                onChange={e => this.setSearch(e.target.value)}
                            /> 
                            <input type="submit" />  
                        </form> 
                    </div>
                    <div>
                        <label htmlFor="sort">Sort:</label>
                        <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                        <option value="">None</option>
                        <option value="peakName">Name</option>
                        <option value="mileage">Mileage</option>
                        <option value="gain">Elevation Gain</option>
                        </select>
                    </div>

                    <div className="App_error">{ this.state.error }</div>
                </section>

                {peaks}
                
                {/* {this.props.store.peaks.map(peak => (
                    <Thumbnail
                        key={peak.id}
                        id={peak.id}
                        name={peak.name}
                        mileage={peak.mileage}
                        class={peak.class}
                        elevation_gain={peak.elevation_gain}
                        trailhead={peak.trailhead}
                        summit={peak.summit}
                        location={peak.location}
                        overview={peak.overview}
                        route={peak.route}
                        website={peak.website}
                        image={peak.image}
                    />
                ))}    */}
            </div>
            
        )
    }
}

export default ViewPeaks


