import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Homepage from './homepage/homepage'
import ViewPeaks from './viewPeaks/viewPeaks'
import Peak from './peak/peak'
import AddComment from './addComment/addComment'
import Navbar from './navbar/navbar'
import config from './config'

class App extends Component {
  state = {
      store: []
  }

  componentDidMount() {
    const baseUrl = `${config.API_ENDPOINT}/peaks`
    const params = []
    if (this.state.search) {
        params.push(`search=${this.state.search}`)
    }
    if (this.state.sort) {
        params.push(`sort=${this.state.sort}`);
    }

    const query = params.join('&')
    const url = `${baseUrl}?${query}`

    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                store: data,
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
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Route 
            exact path='/peaks' 
            render={(props) => (
              <ViewPeaks {...props} store={this.state.store} />
            )}
          />
          
          <Route exact path='/' component={Homepage} />
          <Route 
            exact path='/peaks/:id'
            render={(props) => (
              <Peak {...props} store={this.state.store}/>
            )}
          />
          <Route  
            path='/peaks/:id/comment'
            render={(props) => (
              <AddComment {...props} store={this.state.store} />
            )}
          />
        </header>
      </div>
    )    
  }
}
  



export default App;
