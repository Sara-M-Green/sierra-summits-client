import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Homepage from './homepage/homepage'
import ViewPeaks from './viewPeaks/viewPeaks'
import Peak from './peak/peak'
import AddComment from './addComment/addComment'
import Navbar from './navbar/navbar'
import STORE from './store'

class App extends Component {
  state = {
      store: STORE
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
              <Peak {...props} store={this.state.store} />
            )}
          />
          <Route  path='/peaks/:id/comment' component={AddComment} />
        </header>
      </div>
    )    
  }
}
  



export default App;
