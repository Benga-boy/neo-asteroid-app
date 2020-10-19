import React, { Fragment, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import {Link, useHistory } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
const [formData, setFormData] = useState({
  email: '',
  password: ''
})
const [error, setError] = useState(null)

// History to push user to asteroids page upon successful login
const history = useHistory()

// Function to handle form data input change
const handleFormDataInput = e => {
  setFormData({...formData, [e.target.name]: e.target.value})
}

// Function to handle user login submission to firebase
const handleLoginSubmit = async e => {
  e.preventDefault()
  try {
    await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
    setFormData({
      email: '',
      password: ''
    })
    toast.success('Welcome back!')
    history.push('/asteroids')
  } catch (err) {
    setError(err.message)
  }
}


  return (
    <Fragment>
      <section className="section is-medium login">
        <ToastContainer />
        <h1 className="has-text-centered title">Login</h1>
        {
          error && <p className="has-text-centered error">{error}</p>
        }
        <div className="container signup">
          <form onSubmit={handleLoginSubmit} >
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input name="email" className="input" onChange={handleFormDataInput} type="email" placeholder="Email" value={formData.email} />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input name="password" className="input" onChange={handleFormDataInput} type="password" placeholder="Password" value={formData.password} />
              </p>
            </div>
            <div className="field">
              <p className="login-signup">
                Dont have an account? Signup <Link to="/signup">here</Link>
                <br/><br/>
              </p>
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
