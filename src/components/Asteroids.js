import React, {Fragment, useEffect, useState} from 'react'
import AsteroidCard from './common/AsteroidCard'
import firebase from 'firebase/app'
import db from '../config/firebase'
import 'firebase/auth'

export const Asteroids = () => {
const [data, setData] = useState(null)
const [user, setUser] = useState({})

// on mount fetch my list of asteroids and store then in array of data then display them
// Also check to see if there is a user logged in on mount
useEffect(() => {
  fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=10&api_key=${process.env.REACT_APP_API_KEY}`)
  .then(res => res.json())
  .then(json => {
    setData(json.near_earth_objects)
  })
  authListener()
}, [])


  // Function check if a user is signed in or not!
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }

  if (!data) return <h1>Loaing....</h1>

  

  // Find the user record and then update it with their favourite asteroid
const favouriteAsteroid = e => {
  e.persist()
  const arrayUnion = firebase.firestore.FieldValue.arrayUnion
  db.collection('users').where('user_id', '==', user.uid).get()
  .then(snapshot => {
    snapshot.forEach((doc) => {
      db.collection('users').doc(doc.id).update({
        favAsteroids: arrayUnion(e.target.value)
      })
    })
  })
  window.alert('Added to favourites')
  }
  
  return (
    <section className="show-all section">
    <div className="container">
      <div className="columns is-multiline">
        {/* Check to make sure there are elements in the data array. If so, display them... Else display Loading... */}
        {
          data.length > 0 ? (
            <Fragment>
              {
                data.map(item => <AsteroidCard key={item.id} {...item}  addFavorite ={favouriteAsteroid} user={user} />)
              }
            </Fragment>
          ) : <h1>Loading...</h1>
        }
      </div>
    </div>
  </section>
  )
}

export default Asteroids
