import React from 'react'
import { Link } from 'react-router-dom'

// ! Card component to display each Asteroid

const AsteroidCard = ({ id, name, nasa_jpl_url, orbital_data, addFavorite, user }) => {
  return (
    <div className="tile column is-one-quarter-desktop">
        <div className="card">
        <Link to={`/asteroids/${id}`} className="card-link" >
          <div className="card-content">
            <p><strong>Asteroid id: </strong>{id} </p>
            <p>
              <strong>Name: </strong>
              {name}
            </p>
            <p className="subtitle">
              <strong>Description: </strong> <br />
              {orbital_data.orbit_class.orbit_class_description}
            </p>
          </div>
          </Link>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                View on <a href={nasa_jpl_url} target="_blank" rel="noopener noreferrer" >NASA</a>
              </span>
            </p>
            {user ? <button className="card-footer-item" onClick={addFavorite} value={id}>
                Add to favorites: {id}
            </button> : <small> <Link to="/signup" >Signup</Link>  or <Link to="/login" >Login</Link> <br/> to add to favourites</small>}
          </footer>
        </div>
    </div>
  )
}

export default AsteroidCard
