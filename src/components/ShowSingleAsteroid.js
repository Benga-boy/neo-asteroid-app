import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ShowSingleAsteroid = () => {
  const [data, setData] = useState(null)

  // Get the asteroid id from the params id passed in
  const params = useParams()

  // Fetch the single asteroid, store in data then display to the user on mount
  useEffect(() => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        setData(json)
      })
  }, [params.id])


  // Let the user know that the data is still being fetched!
  if (!data) return <h1>Loading...</h1>

  return (
    <div>
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
                <hr/>
                <p className="subtitle">
                <strong>Description: </strong>{data.orbital_data.orbit_class.orbit_class_description}
                </p>
                <hr/>
                {
                  data.close_approach_data.length > 0 ? (<p className="subtitle">
                    <strong>Orbiting: </strong>
                    {data.close_approach_data[0].orbiting_body}
                  </p>) : (<p className="subtile">
                  <strong>Orbiting: </strong>
                  N/A
                  </p>)
                }
                <hr/>
                <p className="subtitle">
                  <strong>First seen: </strong>
                  {data.orbital_data.first_observation_date}
                </p>
                <hr/>
                <p className="subtitle">
                  <strong>Last seen: </strong>
                  {data.orbital_data.last_observation_date}
                </p>
                <hr/>
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
    </div>
  )
}

export default ShowSingleAsteroid
