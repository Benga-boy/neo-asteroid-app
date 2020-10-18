import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

const Navbar = () => {
  const [user, setUser] = useState(null)

  // History required to push user to sign in page upon loggng out
  const history = useHistory()

  // Check if user is logged in or not on mount!
  useEffect(() => {
    authListener()
  }, [])


  // Check if a user is signed in or not!
  // ! Required to toggle signup and login buttons
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }


  // Function to handle user logout
  const handleLogout = () => {
    firebase.auth().signOut()
    window.alert('Goodbye and hope to see you soon')
    history.push('/login')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item logo" ><ion-icon name="planet-outline"></ion-icon></Link>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {user && <Link className="navbar-item" to="/favourites" >
            Favourites
          </Link>}
          <Link className="navbar-item" to="/asteroids" >
            Asteroids
          </Link>
          <Link className="navbar-item" to="/searchAsteroids" >
            Search by date
          </Link>
          <Link className="navbar-item" to="/singleAsteroids" >
            Search by id
          </Link>
          {
            !user ? (<Link className="navbar-item" to="/login" >
              Login/Register
            </Link>) : (<div onClick={handleLogout} className="navbar-item logout">Logout</div>)
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
