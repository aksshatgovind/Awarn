import React from 'react'
import Avalanche from './screens/avalanche'
import Home from './screens/home'
import About from './screens/about'
import Guide from './screens/guide'
import Flood from './screens/flood'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Avalanche" element={<Avalanche />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/guide" element={<Guide/>} />
          <Route exact path="/Flood" element={<Flood/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;