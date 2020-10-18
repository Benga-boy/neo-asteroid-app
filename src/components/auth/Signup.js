import React, { Fragment, useState } from 'react'
import db from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useHistory } from 'react-router-dom'

const Signup = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)


// History required to push user to asteroid page upon successful signup
const history = useHistory()

// Function to handle name input change
const handleNameInput = e => {
  setName(e.target.value)
}

// Function to handle email input change
const handleEmailInput = e => {
  setEmail(e.target.value)
}

// Function to handle password input change
const handlePasswordInput = e => {
  setPassword(e.target.value)
}


// Function to sign user up and create a user record for that user in firebase
const handleSignupSubmit = async e => {
  e.preventDefault()
  let ref = db.collection('users').doc(email)
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await ref.set({
      name: name,
      favAsteroids: [],
      user_id: user.user.uid
    })
    setName('')
    setEmail('')
    setPassword('')
    history.push('/asteroids')
  } catch (err) {
    setError(err.message)
  }
  window.alert(`Welcome ${name}`)
}

  return (
    <Fragment>
      <section className="section is-medium">
        <h1 className="has-text-centered title">Register Here</h1>
        {
          error && <p className="has-text-centered error">{error}</p>
        }
        <div className="container signup">
          <form onSubmit={handleSignupSubmit} >
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" onChange={handleNameInput} type="text" placeholder="Name" value={name} />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" onChange={handleEmailInput} type="email" placeholder="Email" value={email} />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input" onChange={handlePasswordInput} type="password" placeholder="Password" value={password} />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Signup
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  )
}


export default Signup
