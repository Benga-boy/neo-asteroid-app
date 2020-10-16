import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Asteroids from './components/Asteroids'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Footer from './components/common/Footer'
import Landing from './components/common/Landing'
import Navbar from './components/common/Navbar'
import SearchAsteroids from './components/SearchAsteroids'
import ShowSingleAsteroid from './components/ShowSingleAsteroid'
import SingleAsteroid from './components/SingleAsteroid'



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/asteroids" component={Asteroids} />
        <Route exact path="/asteroids/:id" component={ShowSingleAsteroid} />
        <Route exact path="/searchAsteroids" component={SearchAsteroids} />
        <Route exact path="/singleAsteroids" component={SingleAsteroid} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
