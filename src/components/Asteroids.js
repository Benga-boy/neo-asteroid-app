import React, { Fragment, useEffect, useState } from 'react'
import AsteroidCard from './common/AsteroidCard'
import firebase from 'firebase/app'
import db from '../config/firebase'
import 'firebase/auth'
import images from '../styles/assets/image'

export const Asteroids = () => {
  const [data, setData] = useState(null)
  const [user, setUser] = useState({})

  // on mount fetch my list of asteroids and store then in array of data then display them
  // Also check to see if there is a user logged in on mount
  useEffect(() => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=${Math.floor(Math.random() * 100)}&size=10&api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        setData(json.near_earth_objects)
      })
    authListener()
  }, [])


  // Function check if a user is signed in or not
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }

  if (!data) return <h1>Loading....</h1>

  console.log(data)

  // Add a random image to each Asteroid data
  data.map(item => item.image = images[Math.floor(Math.random() * images.length)].image)

  // Find the user record and then update it with their favourite asteroid
  const favouriteAsteroid = item => {
    if (!user) {
      window.alert('You must sign up or login to add Asteroid to favourites!')
    }
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion
    db.collection('users').where('user_id', '==', user.uid).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            favAsteroids: arrayUnion(item)
          })
        })
      }).catch(err => {
        console.log(err)
      })
    window.alert('Added to favourites')
  }

  return (
    <section className="show-all section">
      <div className="container">
        <h1 className="title has-text-centered is-1">
          Asteroids
        </h1>
        <div className="columns is-multiline">
          {/* Check to make sure there are elements in the data array. If so, display them... Else display Loading... */}
          {
            data.length > 0 ? (
              <Fragment>
                {
                  data.map(item => <AsteroidCard key={item.id} item={item} addFavorite={favouriteAsteroid} user={user} />)
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
