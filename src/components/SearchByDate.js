import React, { Fragment, useEffect, useState } from 'react'
import AsteroidCard from './common/AsteroidCard'
import firebase from 'firebase/app'
import db from '../config/firebase'
import 'firebase/auth'
import images from '../styles/assets/image'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SearchByDate = () => {
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  })
  const [user, setUser] = useState({})

  // check to see if there is a user logged in on mount
  useEffect(() => {
    authListener()
  }, [])

  //Function to handle date changes
  const handleDateChanges = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  // Function to handle submission of dates to api endpoint then return data
  const handleDateQuerySubmit = async e => {
    e.preventDefault()
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${formData.startDate}&end_date=${formData.endDate}&detailed=true&api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        setData(json.near_earth_objects)
      }).catch(err => {
        console.log(err)
      })
      setFormData({
        startDate: '',
        endDate: ''
      })
  }

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

  // Variable to store filtered asteroid data by closest approach date
  let limitedAsteroids = []

  // * the data is coming back as a dictionary
  // * 1. convert the data into an array
  // * 2. filter the array to return only asteroids where the the close approach data array is not empty
  // * 3. map through the now filtered array and push each asteroid into the limitedAsteroids array
  if (data) {
    Object.keys(data).map(key => data[key].filter(item => item.close_approach_data.length > 0).map(
      value => limitedAsteroids.push(value)
    ))
  }

  // Add a random image to each Asteroid data
  limitedAsteroids.map(item => item.image = images[Math.floor(Math.random() * images.length)].image)



  // * Sort the data by close approach date, with the closest data appearing first then slice the array to only return the first 10 elements
  limitedAsteroids.sort((a, b) => new Date(b.close_approach_data[0].close_approach_date) - new Date(a.close_approach_data[0].close_approach_date))
  limitedAsteroids = limitedAsteroids.slice(0, 10)

  // Find the user record and then update it with their favourite asteroid
  // Also check the user record to see if the asteroid is already in they favArray and return alert to let user know its already added
  const favouriteAsteroid = item => {
    if (!user) {
      toast.warning('You must sign up or login to add Asteroid to favourites!')
    }
    console.log(user)
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion
    db.collection('users').where('user_id', '==', user.uid).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          const usersArray = doc.data().favAsteroids.findIndex(ast => ast.id === item.id)
          if (usersArray === -1) {
          db.collection('users').doc(doc.id).update({
            favAsteroids: arrayUnion(item)
          })
          toast.success('Added to favourites')
          } else {
            toast.warning('Already in your favourites')
          }
        })
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <Fragment>
      <nav className="level search-by-date-top">
        <div className="columns">
          <div className="column is-half-mobile">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-6">
                  Start date
                </p>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <p className="control">
                    <input className="input" type="date" name="startDate" onChange={handleDateChanges} value={formData.startDate} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half-mobile">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-6">
                  End Date
              </p>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <p className="control">
                    <input className="input" name="endDate" type="date" onChange={handleDateChanges} value={formData.endDate} />
                  </p>
                </div>
              </div>
              <button onClick={handleDateQuerySubmit} className="button is-small is-info">Search</button>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      {/* Check if data is true. if !true, display info telling the user how to fetch the data, if true, display the asteroids returned */}
      {
        data === null || data === undefined ? (<Fragment>
          <div className="no-favs">
            <section className="section is-medium instructions">
              <div className="container box">
                <h1 className="title is-4 has-text-centered">Search for a list of Near Earth Objects within a date range</h1>
                <h2 className=" error subtitle has-text-centered">
                  Please note, the max range is 7 days
              </h2>
              </div>
            </section>
          </div>
        </Fragment>) : (<Fragment>
          <section className="show-all section asteroids-index">
            <ToastContainer />
            <div className="container">
              <div className="columns is-multiline">
                {limitedAsteroids && limitedAsteroids.map(item => <AsteroidCard key={item.id} item={item} addFavorite={favouriteAsteroid} user={user} />)
                }
              </div>
            </div>
          </section>
        </Fragment>)
      }
    </Fragment>
  )
}

export default SearchByDate
