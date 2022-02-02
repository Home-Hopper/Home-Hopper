import React, { useEffect, useState } from 'react'
import data from '../../data.json'
import { useNavigate } from 'react-router-dom'

const AutoComplete = ({ isOnFilter, URL, locationInput, setLocationInput }) => {
  const [cities] = useState([...data])
  const [filteredCities, setFilteredCities] = useState([])
  const [typing, setTyping] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (locationInput === '' && isOnFilter) {
      let params = new URLSearchParams(URL.search)
      params.delete('location')
      navigate(`${URL.pathname}?${params}`)
    }
  }, [locationInput, URL?.pathname, URL?.search, isOnFilter, navigate])

  const filterResults = (query) => {
    let results
    if (query.length === 0) {
      //If there's no query, display nothing, as there's too many cities in the data
      results = []
      setTyping(false)
    } else {
      results = cities.filter((city) => {
        return city.city.toLowerCase().includes(query.toLowerCase())
      })
    }
    setFilteredCities(results)
  }

  const selectSuggestion = (suggestion) => {
    setLocationInput(suggestion)
    setFilteredCities([])

    if (isOnFilter) {
      let params = new URLSearchParams(URL.search)
      params.set('location', suggestion)
      navigate(`${URL.pathname}?${params}`)
    }
  }
  return (
    <div className=" w-full relative">
      <input
        className="border-2 outline-none w-full h-6 pl-3 border-none rounded"
        type="text"
        value={locationInput}
        name="location"
        onChange={(event) => {
          setTyping(true)
          setLocationInput(event.target.value)
          filterResults(event.target.value)
        }}
      />
      {typing && (
        <ul className="w-full h-60 overflow-y-scroll bg-white absolute shadow-md">
          {filteredCities.map((city, index) => {
            return (
              <li
                key={index + Date.now()}
                className="hover:bg-purple-dark hover:text-white cursor-pointer "
                onClick={() => {
                  setTyping(false)
                  selectSuggestion(city.city)
                }}
              >
                {city.city}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default AutoComplete
