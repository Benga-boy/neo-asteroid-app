import React, { Fragment, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import db from '../config/firebase'
import 'firebase/auth'
import { Link } from 'react-router-dom'

const Favourites = () => {
  const [data, setData] = useState(null)
  const [user, setUser] = useState(null)


  // On mount, check to make sure theres a user. If user, then get their favourites from the cloud database
  useEffect(() => {
    authListener()
    if (user) {
      db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            setData(doc.data().favAsteroids)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  }, [user])

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

  if (!data) return <h1>You have no favourites</h1>

  return (
    <Fragment>
      {data.length === 0 ? (<Fragment>
        <div className="no-favs">
          <section className="section is-medium">
            <div className="container box">
              <h1 className="title is-4 has-text-centered">Please start adding favourites to see them listed</h1>
            </div>
          </section>
        </div>
      </Fragment>) : (
          <section className="show-all section asteroids-index">
            <div className="container">
              <h1 className="title has-text-centered is-1">
                Favourite Asteroids
              </h1>
              <div className="columns is-multiline">
                {/* Map through each item and return an Asteroid card for each item */}
                {data.map((item, i) => <div key={i} className="tile column is-one-third-desktop">
                  <div className="card">
                    <Link to={`/asteroids/${item.id}`} className="card-link" >
                      <div className="card-content">
                        <figure className="image is-256x256">
                          <img src={item.image} alt={item.name} />
                        </figure>
                        <br />
                        <p><strong>Asteroid id: </strong>{item.id} </p>
                        <hr />
                        <p>
                          <strong>Name: </strong>
                          {item.name}
                        </p>
                        <hr />
                        <p className="subtitle">
                          <strong>Description: </strong> <br />
                          {item.orbital_data.orbit_class ? item.orbital_data.orbit_class.orbit_class_description : 'N/A'}
                        </p>
                      </div>
                    </Link>
                    <footer className="card-footer">
                      <p className="card-footer-item">
                        <span>
                          View on <a href={item.nasa_jpl_url} target="_blank" rel="noopener noreferrer" >NASA</a>
                        </span>
                      </p>
                    </footer>
                  </div>
                </div>)}
              </div>
            </div>
          </section>)}
    </Fragment>
  )
}

export default Favourites
