import React, { Fragment, useState } from 'react'

const SingleAsteroid = () => {
  const [data, setData] = useState(null)
  const [asteroidId, setId] = useState('')
  const [error, setError] = useState('')


  // Handle change function for id input
  const handleIdChange = e => {
    setId(e.target.value)
  }

  // Function to handle submission of id to NASA API endpoint, then returns data
  const handleSearch = () => {
    if (!asteroidId) {
      return setError('Please enter a valid id to search')
    }
    setError('')
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId.trim()}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        setData(json)
      })
      .catch((err) => {
        if (err) {
          setError('Please enter a valid id to search')
        }
      })
    setId('')
  }


  // Store search bar in a variable to be reusable when no search is made and when one is made. This will stop data returning null before a search is made
  // ! Didnt need this in the end but decided to keep as it still renders perfectly on page.
  const searchBar = <nav className="level search-by-id-top">
    <div className="level-left">
      <div className="level-item has-text-centered">
      </div>
      <div className="level-item">
        <div className="field has-addons">
          <p className="control">
            <input className="input is-medium" value={asteroidId} type="text" placeholder="Find an Asteroid" onChange={handleIdChange} />
            {!error ? <small>*Please type in Asteroid id</small> : <small className="error">{error} </small>}
          </p>
          <p className="control">
            <button onClick={handleSearch} className="button is-medium">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>
  </nav>


  return (
    <div>
      {searchBar}
      <hr />
      {
        data === null ? (<Fragment>
          <div className="no-favs">
            <section className="section is-medium">
              <div className="container box">
                <h1 className="title is-4 has-text-centered">Search for an Asteroid by typing in its ID above</h1>
              </div>
            </section>
          </div>
        </Fragment>) : (<Fragment>
          <section className="section is-medium">
            <div className="container single-asteroid">
              <h1 className="title">
                {data.name}
              </h1>
              <div className="tile column is-two-thirds">
                <div className="card">
                  <div className="card-content">
                    <p className="subtitle">
                      <strong>Asteroid id: </strong>
                      {data.id}
                    </p>
                    <hr />
                    <p className="subtitle">
                      <strong>Description: </strong>{data.orbital_data.orbit_class ? data.orbital_data.orbit_class.orbit_class_description : 'N/A'}
                    </p>
                    <hr />
                    {
                      data.close_approach_data.length > 0 ? (<p className="subtitle">
                        <strong>Orbiting: </strong>
                        {data.close_approach_data[0].orbiting_body}
                      </p>) : (<p className="subtile">
                        <strong>Orbiting: </strong>
                        N/A
                      </p>)
                    }
                    <hr />
                    <p className="subtitle">
                      <strong>First seen: </strong>
                      {data.orbital_data.first_observation_date}
                    </p>
                    <hr />
                    <p className="subtitle">
                      <strong>Last seen: </strong>
                      {data.orbital_data.last_observation_date}
                    </p>
                    <hr />
                    {
                      data.close_approach_data.length > 0 ? (<p className="subtitle">
                        <strong>Close approach date: </strong>
                        {data.close_approach_data[0].close_approach_date}
                      </p>) : (<p className="subtile">
                        <strong>Close approach date: </strong>
                        N/A
                      </p>)
                    }
                  </div>
                  <footer className="card-footer">
                    <p className="card-footer-item">
                      <span>
                        View on <a href={data.nasa_jpl_url} target="_blank" rel="noopener noreferrer">NASA</a>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </section>
        </Fragment>)
      }
    </div>
  )
}

export default SingleAsteroid
