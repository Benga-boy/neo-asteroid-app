import React, { Fragment, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import {useHistory } from 'react-router-dom'

const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)

// History to push user to asteroids page upon successful login
const history = useHistory()

// Function to handle email input change
const handleEmailInput = e => {
  setEmail(e.target.value)
}

// Function to handle password input change
const handlePasswordInput = e => {
  setPassword(e.target.value)
}

// Function to handle user login submission to firebase
const handleLoginSubmit = async e => {
  e.preventDefault()
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    setEmail('')
    setPassword('')
    history.push('/asteroids')
  } catch (err) {
    setError(err.message)
  }
}


  return (
    <Fragment>
      <section className="section is-medium">
        <h1 className="has-text-centered title">Login</h1>
        {
          error && <p className="has-text-centered error">{error}</p>
        }
        <div className="container signup">
          <form onSubmit={handleLoginSubmit} >
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
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  )
}

export default Login
