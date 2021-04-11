import React from 'react'
import { Route } from 'react-router-dom'
import Homepage from './homepage/homepage'
import ViewPeaks from './viewPeaks/viewPeaks'
import Peak from './peak/peak'
import AddComment from './addComment/addComment'
import Navbar from './navbar/navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Route exact path='/peaks' component={ViewPeaks} />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/peaks/:id' component={Peak} />
        <Route  path='/peaks/:id/comment' component={AddComment} />
      </header>
    </div>
  );
}

export default App;
