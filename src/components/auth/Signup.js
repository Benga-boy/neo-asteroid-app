import React, { Fragment, useState } from 'react'
import db from '../../config/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useHistory } from 'react-router-dom'

const Signup = () => {
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
})
const [error, setError] = useState(null)


// History required to push user to asteroid page upon successful signup
const history = useHistory()


// Function to handle formData input change
const handleFormDataInput = e => {
  setFormData({...formData, [e.target.name]: e.target.value})
}


// Function to sign user up and create a user record for that user in firebase
const handleSignupSubmit = async e => {
  e.preventDefault()
  let ref = db.collection('users').doc(formData.email)
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
    await ref.set({
      name: formData.name,
      favAsteroids: [],
      user_id: user.user.uid
    })
    setFormData({
      name: '',
      email: '',
      password: ''
    })
    window.alert(`Welcome ${formData.name}`)
    history.push('/asteroids')
  } catch (err) {
    setError(err.message)
  }
}

  return (
    <Fragment>
      <section className="section is-medium register">
        <h1 className="has-text-centered title">Signup Here</h1>
        {
          error && <p className="has-text-centered error">{error}</p>
        }
        <div className="container signup">
          <form onSubmit={handleSignupSubmit} >
            <div className="field">
              <p className="control has-icons-left">
                <input name="name" className="input" onChange={handleFormDataInput} type="text" placeholder="Name" value={formData.name} />
              </p>
            </div>
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
