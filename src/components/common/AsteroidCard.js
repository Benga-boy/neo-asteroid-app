import React from 'react'
import { Link } from 'react-router-dom'

// ! Card component to display each Asteroid

const AsteroidCard = ({ item, addFavorite, user }) => {
  return (
    <div className="tile column is-one-quarter-desktop">
      <div className="card">
        <Link to={`/asteroids/${item.id}`} className="card-link" >
          <div className="card-content">
            <figure className="image is-256x256">
              <img src={item.image}  alt={item.name}/>
            </figure>
            <br/>
              <p><strong>Asteroid id: </strong>{item.id} </p>
              <hr />
              <p>
                <strong>Name: </strong>
                {item.name}
              </p>
              <hr />
              <p className="subtitle">
                <strong>Description: </strong> <br />
                {item.orbital_data.orbit_class ?  item.orbital_data.orbit_class.orbit_class_description : 'N/A'}
              </p>
          </div>
          </Link>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                View on <a href={item.nasa_jpl_url} target="_blank" rel="noopener noreferrer" >NASA</a>
              </span>
            </p>
            {user ? <button className="card-footer-item button is-small fav-btn is-danger" onClick={() => addFavorite(item)}>
              Add to favorites
            </button> : <small className="login"><Link to="/login" >Login</Link> to add to favourites</small>}
          </footer>
        </div>
      </div>
  )
}

export default AsteroidCard
