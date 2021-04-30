import React from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'
import config from '../config'

class ViewPeaks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            peaks: [],
            search: '',
            sort: '',
            class: null,
            mileage: null,
            gain: null,
            error: null,
            filterablePeaks: this.props.store,
            selectedFilters: []
        }
    }


    handleViewAll = () => {
        this.setState({
            peaks: this.props.store            
        })
    }

    
    setSearch = (search) => {
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

    handleSort = () => {
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
            if (sort !== 'gain') {
                peakResults.sort((a, b) => {
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
                })    
            } else {
                peakResults.sort((a, b) => {
                    return parseInt(a[sort].replace(/,/g, '')) > parseInt(b[sort].replace(/,/g, '')) ? 1 : parseInt(a[sort].replace(/,/g, '')) < parseInt(b[sort].replace(/,/g, '')) ? -1 : 0
                })    
            } 

            this.setState({
                peaks: peakResults
            })            
        }
    }


    handleSubmit(e) {
        e.preventDefault()

        const baseUrl = `${config.API_ENDPOINT}/peaks`
        const params = []
        if (this.state.search) {
            params.push(`search=${this.state.search}`)
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

    filterMileage = (e) => {
        if (!e.target.value) {
            const newSelectedFilter = this.state.selectedFilters.filter(item => item !== 'mileage')
            this.setState({
                mileage: null,
                selectedFilters: newSelectedFilter
            }, () => {
                this.filterPeaks()
            })
        } else {
            if (this.state.selectedFilters.indexOf('mileage') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'mileage']
                })
            }
            this.setState({
                mileage: e.target.value,
            }, () => {
                this.filterPeaks()
            })            
        }
    }

    filterGain = (e) => {
        if (!e.target.value) {
            const newSelectedFilter = this.state.selectedFilters.filter(item => item !== 'gain')
            this.setState({
                gain: null,
                selectedFilters: newSelectedFilter
            }, () => {
                this.filterPeaks()
            })
        } else {
            if (this.state.selectedFilters.indexOf('gain') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'gain']
                })
            }
            this.setState({
                gain: parseInt(e.target.value),
                
            }, () => {
                this.filterPeaks()
            })            
        }
    }

    filterClass = (e) => {
        if (!e.target.value) {
            const newSelectedFilter = this.state.selectedFilters.filter(item => item !== 'class')
            this.setState({
                gain: null,
                selectedFilters: newSelectedFilter
            }, () => {
                this.filterPeaks()
            })
        } else {
            if (this.state.selectedFilters.indexOf('class') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'class']
                })
            }
            this.setState({
                class: parseInt(e.target.value),   
            }, () => {
                this.filterPeaks()
            })            
        }
    }



    filterPeaks = () => {
        this.setState({
            filterablePeaks: this.props.store
        }, () => {

            //single item filtering

            if (this.state.selectedFilters.length === 1 && this.state.selectedFilters[0] === 'mileage') {
                let filteredPeaks = this.state.filterablePeaks.filter(p => p.mileage <= this.state.mileage)
                this.setState({
                    peaks: filteredPeaks
                })
            }

            if (this.state.selectedFilters.length === 1 && this.state.selectedFilters[0] === 'gain') {
                let filteredPeaks = this.state.filterablePeaks.filter(p => parseInt(p.gain.replace(/,/g, '')) <= this.state.gain)
                this.setState({
                    peaks: filteredPeaks
                })
            }

            if (this.state.selectedFilters.length === 1 && this.state.selectedFilters[0] === 'class') {
                let filteredPeaks = this.state.filterablePeaks.filter(p => p.class[0].includes(this.state.class.toString()))
                this.setState({
                    peaks: filteredPeaks
                })
            }

            //double item filtering

                //gain + mileage

            if (this.state.selectedFilters.length === 2 && this.state.selectedFilters.includes('mileage' && 'gain')) {
                let filteredPeaks = this.state.filterablePeaks.filter(p => {
                    return (p.mileage <= this.state.mileage) && (parseInt(p.gain.replace(/,/g, '')) <= this.state.gain)
                })

                this.setState({
                    peaks: filteredPeaks
                })
            }

                //mileage + class

            if (this.state.selectedFilters.length === 2 && this.state.selectedFilters.includes('mileage' && 'class')) {
                console.log('miles plus class filter')
                let filteredPeaks = this.state.filterablePeaks.filter(p => {
                    return (p.mileage <= this.state.mileage) && (p.class[0].includes(this.state.class.toString()))
                })
                
                console.log(filteredPeaks)

                this.setState({
                    peaks: filteredPeaks
                })
            }

                //class + gain
            
            if (this.state.selectedFilters.includes('gain' && 'class') && this.state.selectedFilters.length === 2) {
                let filteredPeaks = this.state.filterablePeaks.filter(p => {
                    return (parseInt(p.gain.replace(/,/g, '')) <= this.state.gain) && ( p.class[0].includes(this.state.class.toString()) )
                })

                this.setState({
                    peaks: filteredPeaks
                })
            }
            

            // triple item filtering

            if (this.state.selectedFilters.length === 3) {
                let filteredPeaks = this.state.filterablePeaks.filter(p => {
                   return (p.mileage <= this.state.mileage) && (parseInt(p.gain.replace(/,/g, '')) <= this.state.gain) && (p.class[0].includes(this.state.class.toString()) )
                })
                this.setState({
                    peaks: filteredPeaks
                })
            }

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
                <p>The current peak list is a sample set of 54 peaks in the Sierra Nevada Mountain Range</p>
                <button className="center" onClick={this.handleViewAll}>View All</button>
                    <div className="center" id="searchByName">
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
                        <div className="center">
                            <label htmlFor="sort">Sort:</label>
                            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="peakname">Name</option>
                            <option value="mileage">Mileage</option>
                            <option value="gain">Elevation Gain</option>
                            </select>
                        </div>
                    </div>


                <section className="center" id="filters" >
                    <h2>Filter Peaks</h2>
                    <div>
                        <label>Filter By Max Mileage To Summit (One Way)</label>
                      
                        <select name="mileage" onChange={e => this.filterMileage(e)}>
                            <option value=""> </option>
                            <option value="2">2 miles</option>
                            <option value="2.5">2.5 miles</option>
                            <option value="3">3 miles</option>
                            <option value="3.5">3.5 miles</option>
                            <option value="4">4 miles</option>
                            <option value="4.5">4.5 miles</option>
                            <option value="5">5 miles</option>
                            <option value="5.5">5.5 miles</option>
                            <option value="6">6 miles</option>
                        </select>
                    </div>

                    <div>
                        <label>Filter By Max Elevation Gain</label>
                        <select name="gain" onChange={e => this.filterGain(e)}>
                            <option value=""> </option>
                            <option value="1000">1000 ft</option>
                            <option value="1500">1500 ft</option>
                            <option value="2000">2000 ft</option>
                            <option value="2500">2500 ft</option>
                            <option value="3000">3000 ft</option>
                            <option value="3500">3500 ft</option>
                            <option value="4000">4000 ft</option>
                            <option value="4500">4500 ft</option>
                            <option value="5000">5000 ft</option>
                            <option value="5500">5500 ft</option>
                            <option value="6000">6000 ft</option>
                        </select>
                    </div>

                    <div>
                        <label>Filter By Class</label>
                            <select name="class" onChange={e => this.filterClass(e)}>
                                <option value="">   </option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                            </select>
                    </div>

                </section>
                
                <div className="App_error">{ this.state.error }</div>
                {peaks}
                
            </div>
            
        )
    }
}

export default ViewPeaks


