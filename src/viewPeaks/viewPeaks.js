import React from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'
import config from '../config'

// let peaksClasses = []

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
            })
        } else {
            if (this.state.selectedFilters.indexOf('mileage') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'mileage']
                })
            }
            this.setState({
                mileage: e.target.value,
            })            
        }
    }

    filterGain = (e) => {
        if (!e.target.value) {
            const newSelectedFilter = this.state.selectedFilters.filter(item => item !== 'gain')
            this.setState({
                gain: null,
                selectedFilters: newSelectedFilter
            })
        } else {
            if (this.state.selectedFilters.indexOf('gain') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'gain']
                })
            }
            this.setState({
                gain: parseInt(e.target.value),
                
            })            
        }
    }

    filterClass = (e) => {
        if (!e.target.value) {
            const newSelectedFilter = this.state.selectedFilters.filter(item => item !== 'class')
            this.setState({
                gain: null,
                selectedFilters: newSelectedFilter
            })
        } else {
            if (this.state.selectedFilters.indexOf('class') === -1) {
                this.setState({
                    selectedFilters: [...this.state.selectedFilters, 'class']
                })
            }
            this.setState({
                class: parseInt(e.target.value),   
            })            
        }
    }



    handleClassSelects = (e) => {
        
    }

    // handleFilterSubmit = (e) => {
    //     e.preventDefault()

    //     let filteredPeaks = []  
        
        
    //     if (this.state.mileage) {
    //         this.state.filterablePeaks.forEach(p => {
    //             if ( (p.mileage <= this.state.mileage) && (filteredPeaks.indexOf(p) === -1)  ) {
    //                 filteredPeaks.push(p)
    //             }
    //         })
    //     }
    
    //     if (this.state.gain) {
    //         this.state.filterablePeaks.forEach(p => {
    //             if ( (parseInt(p.gain.replace(/,/g, '')) <= this.state.gain) && (filteredPeaks.indexOf(p) === -1) ) {
    //                 filteredPeaks.push(p)
    //             }            
    //         })

            
    //     }

    //     this.state.classes.forEach(c => {
    //         if(c.isChecked === true) {
    //             let checkedPeaks = this.state.filterablePeaks.filter(p =>
    //                 p.class[0].includes(c.value.toString())    
    //             )

    //             checkedPeaks.forEach(p => {
    //                 filteredPeaks.push(p)
    //             })
    //         }
    //     })


        

    //     this.setState({
    //         peaks: filteredPeaks
    //     })
    // }

    // handleClassSelects = (e) => {
    //     let peaksClasses = []

    //     let classes = this.state.classes

    //     classes.forEach(c => {
    //         if (c.value === parseInt(e.target.value))
    //             c.isChecked = e.target.checked
    //     })

    //     this.setState({ 
    //         classes: classes
    //     }, ()=> {
    //         this.setState({
    //             filterablePeaks: this.props.store
    //         }, () => { 
    //             console.log(this.state.gain)
                
    //             if (this.state.mileage !== 0 || this.state.gain !== 0) {

    //                 this.state.classes.forEach(c => {
    //                     if (c.isChecked === true) {
    //                         let checkedPeaks = this.state.peaks.filter(p => 
    //                             p.class[0].includes(c.value.toString())    
    //                         )
    //                         checkedPeaks.forEach(peak => peaksClasses.push(peak))
    //                     }

    //                     this.setState({
    //                         peaks: peaksClasses
    //                     })
                        
    //                 })


    //             } else {
    //                 this.state.classes.forEach(c => {
    //                     if (c.isChecked === true) {
    //                         let checkedPeaks = this.state.filterablePeaks.filter(p =>
    //                             p.class[0].includes(c.value.toString())
    //                         )
    //                         checkedPeaks.forEach(peak => peaksClasses.push(peak))
    //                     }

    //                     this.setState({
    //                         peaks: peaksClasses
    //                     })
    //                 })
    //             }    
    //         })
    //     })
    // }


    // filterMileage = (e) => {
    //     let peaksMileage = []

    //     this.setState({
    //         mileage: e.target.value
    //     }, () => {
    //         this.setState({
    //             filterablePeaks: this.props.store
    //         }, () => {
                
    //             if ( (this.state.gain)  ) {
    //                 this.state.peaks.forEach(p => {
    //                     if (p.mileage <= this.state.mileage) {
    //                         peaksMileage.push(p)
    //                     }
    //                 })

    //                 this.setState({
    //                     peaks: peaksMileage
    //                 })    

    //             }  else {
    //                 this.state.filterablePeaks.forEach(p => {
    //                     if (p.mileage <= this.state.mileage) {
    //                         peaksMileage.push(p)
    //                     }
    //                 })

    //                 this.setState({
    //                     peaks: peaksMileage
    //                 })

    //             }
    //         })
    //     })
    // }

    // filterGain = (e) => {
    //     let peaksGain = []

    //     this.setState({
    //         gain: e.target.value
    //     }, () => {

    //         this.setState({
    //             filterablePeaks: this.props.store
    //         }, () => {

    //             if ( (this.state.mileage) || (this.state.classes.isChecked = true) ) {
    //                 this.state.peaks.forEach(p => {
    //                     if ( parseInt((p.gain.replace(/,/g, ''))) <= this.state.gain) {
    //                         peaksGain.push(p)
    //                     }
    //                 })

    //                 this.setState({
    //                     peaks: peaksGain
    //                 })

    //             } else {
    //                 this.state.filterablePeaks.forEach(p => {
    //                     if ( parseInt((p.gain.replace(/,/g, ''))) <= this.state.gain) {
    //                         peaksGain.push(p)
    //                     }
    //                 })  

    //                 this.setState({
    //                     peaks: peaksGain
    //                 })
                    
    //             }
    //         })
    //     })
    // }
    
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
                            <option value="">0</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div>
                        <label>Filter By Max Elevation Gain</label>
                        <select name="gain" onChange={e => this.filterGain(e)}>
                            <option value="">0</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            <option value="2500">2500</option>
                            <option value="3000">3000</option>
                            <option value="3500">3500</option>
                            <option value="4000">4000</option>
                            <option value="4500">4500</option>
                            <option value="5000">5000</option>
                            <option value="5500">5500</option>
                            <option value="6000">6000</option>
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


