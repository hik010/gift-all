import React from 'react'

import Navbar from './components/Navbar'
import RoutesContainer from './components/Routes'

const App = () => {
  return (
    <div id='app' className='container'>
      <Navbar />
      <RoutesContainer />
    </div>
  )
}

export default App
