import React from 'react'
import Thumbnail from '../thumbnail/thumbnail'
import './viewPeaks.css'
import Checkbox from '../checkbox/checkbox'
import config from '../config'

// let peaksClasses = []

class ViewPeaks extends React.Component {
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
            mileage: 0,
            gain: 0,
            error: null,
            filterablePeaks: this.props.store,
        }
    }

    


    // componentDidMount() {
    //     this.setState({
    //         peaks: this.props.store
    //     })
    // }

    
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
            if (sort !== 'gain' || sort !== 'mileage') {
                peakResults.sort((a, b) => {
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
                })    
            } else {
                peakResults.sort((a, b) => {
                    // return parseInt(a[sort]) > parseInt(b[sort]) ? 1 : parseInt(a[sort]) < parseInt(b[sort]) ? -1 : 0
                    console.log(parseInt(a[sort]))
                    return parseInt(a[sort]) - parseInt(b[sort])
                })    
            } 

            this.setState({
                peaks: peakResults
            })            
        }

        
    }


    // handleClassSelects = (e) => {

    //     this.setState({
    //         filterablePeaks: this.props.store
    //     }, () => {

    //         let classes = this.state.classes

    //         classes.forEach(classItem => {
    //             if (classItem.value === parseInt(e.target.value))
    //                 classItem.isChecked = e.target.checked
    //         })

    //         this.setState({classes: classes}, () => {

    //             const selectedClass = this.state.classes.find(c => c.value == e.target.value)
    //             console.log(selectedClass)

    //             if (selectedClass.isChecked === true) {
    //                 let checkedPeaks = this.state.filterablePeaks.filter(peak => 
    //                     peak.class[0]
    //                         .includes(e.target.value.toString())
    //                 )
    //                 checkedPeaks.forEach(peak => peaksClasses.push(peak))
    //                 console.log(peaksClasses)

    //                 this.setState({
    //                     peaks: peaksClasses
    //                 })
    //             }
    //             if (selectedClass.isChecked === false) {
    //                 let uncheckedPeaks = peaksClasses.filter(peak => 
    //                     peak.class[0]
    //                         .includes(e.target.value.toString())
    //                 )
    //                 uncheckedPeaks.forEach(peak => peaksClasses.pop(peak))
    //                 console.log(peaksClasses)

    //                 this.setState({
    //                     peaks: peaksClasses
    //                 })
    //             }
    //         })
    //     })
    // }

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


    handleClassSelects = (e) => {
        let peaksClasses = []

        this.setState({
            filterablePeaks: this.props.store
        }, () => {

            let classes = this.state.classes

            classes.forEach(classItem => {
                if (classItem.value === parseInt(e.target.value))
                    classItem.isChecked = e.target.checked
            })

            this.setState({classes: classes}, () => {

                this.state.classes.forEach(c => {
                    if (c.isChecked === true) {
                        let checkedPeaks = this.state.filterablePeaks.filter(p =>
                            p.class[0].includes(c.value.toString())
                        )
                        
                        checkedPeaks.forEach(peak => peaksClasses.push(peak))
                    }
                    this.setState({
                        peaks: peaksClasses
                    })
                })
            })
        })
    }

    filterMileage = (e) => {
        let peaksMileage = []

        this.setState({
            mileage: e.target.value
        }, () => {
            this.setState({
                filterablePeaks: this.props.store
            }, () => {

                if (this.state.gain) {
                    this.state.filterablePeaks.forEach(p => {
                        if (p.mileage <= this.state.mileage) {
                            peaksMileage.push(p)
                        }
                    })

                    this.setState({
                        peaks: peaksMileage
                    })    

                }  else {
                    this.state.peaks.forEach(p => {
                        if (p.mileage <= this.state.mileage) {
                            peaksMileage.push(p)
                        }
                    })

                    this.setState({
                        peaks: peaksMileage
                    })

                }
            })
        })
    }

    filterGain = (e) => {
        let peaksGain = []

        this.setState({
            gain: e.target.value
        }, () => {
            this.setState({
                filterablePeaks: this.props.store
            }, () => {

                if (this.state.mileage) {
                    this.state.filterablePeaks.forEach(p => {
                        if (p.gain <= this.state.gain) {
                            peaksGain.push(p)
                        }
                    })

                    this.setState({
                        peaks: peaksGain
                    })

                } else {
                    this.state.peaks.forEach(p => {
                        if (p.gain <= this.state.gain) {
                            peaksGain.push(p)
                        }
                    })  

                    this.setState({
                        peaks: peaksGain
                    })
                    
                }
            })
        })
    }

    // handleSliders = (e, name) => {
    //     let peakSlider = []

    //     this.setState({
    //         [name]: e.target.value
    //     }, () => {
    //         this.setState({
    //             filterablePeaks: this.props.store
    //         }, () => {

    //             this.state.filterablePeaks.forEach(p => {
    //                 if(p[name] <= this.state.[name]) {
    //                     peakSlider.push(p)
    //                 }
    //             })

    //             this.setState({
    //                 peaks: peakSlider
    //             })
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
        const checkboxes = this.state.classes.map((box, i) => {
            return <Checkbox
                {...box}
                peaks={this.state.peaks} 
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
                        <input type="range" name="mileage" value={this.state.mileage} onChange = {e => this.filterMileage(e)} min="0" max="30" step="1" className="slider" id="myRange" />
                        {this.state.mileage}
                    </div>
                    <div>
                        <label>Filter By Max Elevation Gain</label>
                        <input type="range" name="gain" value={this.state.gain} onChange = {e => this.filterGain(e)} min="1000" max="8000" step="1000" className="slider" id="myRange" />
                        {this.state.gain}
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


