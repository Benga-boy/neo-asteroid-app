import React, { Fragment, useState } from 'react'
import AsteroidCard from './common/AsteroidCard'

const SearchAsteroids = () => {
  const [data, setData] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')


  //Function to handle start date input change
  const handleStartDateChange = e => {
    setStartDate(e.target.value)
  }


  // Function to handle end date input change
  const handleEndDateChange = e => {
    setEndDate(e.target.value)
  }

  // Function to handle submission of dates to api endpoint then return data
  const handleDateQuerySubmit = async e => {
    e.preventDefault()
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(json => {
        setData(json.near_earth_objects)
      }).catch(err => {
        // if (err) {
        //   setError('Please enter a date range within 7 days')
        // }
        console.log(err)
      })
  }

  // Variable to store filtered asteroid data
  let limitedAsteroids = []

  if (data) {
    Object.keys(data).map(key => data[key].filter(item => item.close_approach_data.length > 0).map(
      value => limitedAsteroids.push(value)
    ))
  }

  limitedAsteroids.sort((a, b) => new Date(b.close_approach_data[0].close_approach_date) - new Date(a.close_approach_data[0].close_approach_date))
  limitedAsteroids = limitedAsteroids.slice(0, 10)


  return (
    <Fragment>
      <nav className="level">
        <div className="columns">
          <div className="column">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-6">
                  Start date
                </p>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <p className="control">
                    <input className="input" type="date" onChange={handleStartDateChange} value={startDate} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="level-left">
              <div className="level-item">
                <p className="subtitle is-6">
                  End Date
              </p>
              </div>
              <div className="level-item">
                <div className="field has-addons">
                  <p className="control">
                    <input className="input" type="date" onChange={handleEndDateChange} value={endDate} />
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
        data === null ? (<Fragment>
          <section className="section is-medium">
            <div className="container">
              <h1 className="title has-text-centered">Search for a list of Near Earth Objects with a date range</h1>
              <h2 className="subtitle has-text-centered">
                Please note, the max range is 7 days
              </h2>
            </div>
          </section>
        </Fragment>) : (<Fragment>
          <section className="show-all section">
            <div className="container">
              <div className="columns is-multiline">
                {limitedAsteroids && limitedAsteroids.map(item => <AsteroidCard key={item.id} {...item} />)
                }
              </div>
            </div>
          </section>
        </Fragment>)
      }
    </Fragment>
  )
}

export default SearchAsteroids
