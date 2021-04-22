import React, { Component } from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'
import Checkbox from '../checkbox/checkbox'


class ViewPeaks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peaks: this.props.store,
            search: '',
            sort: '',
            classes: [
                {id: 1, value: 1, isChecked: false},
                {id: 2, value: 2, isChecked: false},
                {id: 3, value: 3, isChecked: false},
                {id: 4, value: 4, isChecked: false},
                {id: 5, value: 5, isChecked: false},
            ],
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

    setSort = (sort) => {
        this.setState({
            sort: sort
        }, () => {
            this.handleSort()
        })
    }

    handleSort() {
        let sort = this.state.sort
        if (sort) {
            if(!['peakname', 'gain', 'mileage' ].includes(sort)) {
               this.setState({
                   error: 'Must sort by Peak Name, Elevation Gain or Mileage'
               })
            }
        }

        if (sort) {
            let peakResults = this.state.peaks
            if (sort !== 'gain' || sort !== 'mileage') {
                peakResults.sort((a, b) => {
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
                })    
            } else {
                peakResults.sort((a, b) => {
                    // return parseInt(a[sort]) > parseInt(b[sort]) ? 1 : parseInt(a[sort]) < parseInt(b[sort]) ? -1 : 0
                    return parseInt(a[sort]) - parseInt(b[sort])
                })    
            } 
            this.setState({
                peaks: peakResults
            })            
        }

        
    }

    handleClassSelects(e) {
        console.log(e.target.value)
        console.log(e.target.checked)
        // let classes = this.state.classes

        // classes.forEach(box => box.isChecked = e.target.checked)

        // this.setState({
        //     classes: classes
        // })
        // this.state.class.push(e.target.value)
        // this.setState({
        //     checked: e.target.checked
        // })
    }

    handleSubmit(e) {
        e.preventDefault()

        const baseUrl = 'http://localhost:8000/api/peaks'
        const params = []
        if (this.state.search) {
            params.push(`search=${this.state.search}`)
        }
        // if (this.state.sort) {
        //     params.push(`sort=${this.state.sort}`);
        // }

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
        const checkboxes = this.state.classes.map((box, i) => {
            return <Checkbox
                {...box} 
                key={i}
                id={box.id} 
                value={box.value} 
                isChecked={box.isChecked}
                handleClick={this.handleClassSelects}
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
                        {checkboxes}
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

                            {/* <SearchField
                                placeholder="Search..."
                                // onChange={onChange}
                                searchText="This is initial search text"
                                classNames="test-class"
                                id="searchbar"
                            /> */}

                            <input type="submit" />  
                        </form> 
                    </div>
                    <div>
                    
                    </div>
                    <div>
                        <label htmlFor="sort">Sort:</label>
                        <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                        <option value="">None</option>
                        <option value="peakname">Name</option>
                        <option value="mileage">Mileage</option>
                        <option value="gain">Elevation Gain</option>
                        </select>
                    </div>

                    <div className="App_error">{ this.state.error }</div>
                </section>

                {peaks}
                
            </div>
            
        )
    }
}

export default ViewPeaks


