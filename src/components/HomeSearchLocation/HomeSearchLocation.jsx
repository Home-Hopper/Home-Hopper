import { useState } from 'react'
import { useLocation } from 'react-router'
import data from '../../data'

const HomeSearchLocation = ({ setSearchParams }) => {
  const locationURL = useLocation()
  const [cities] = useState([...data])
  const [typing, setTyping] = useState(false)
  const [filteredCities, setFilteredCities] = useState([])
  const [locationInput, setLocationInput] = useState('')

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
    let params = new URLSearchParams(locationURL.search)
    params.set('location', suggestion)
    console.log(`${params}`)
    setSearchParams(`${params}`)
    setFilteredCities([])
  }
  return (
    <div className="w-full relative">
      <div>
        <input
          className=" pl-4S outline-none w-full"
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
          <ul className="w-full h-52 overflow-y-scroll bg-white absolute shadow-md">
            {filteredCities.map((city, index) => {
              return (
                <li
                  key={index + Date.now()}
                  className=" pl-4 hover:bg-purple-dark hover:text-white cursor-pointer"
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
    </div>
  )
}
export default HomeSearchLocation
