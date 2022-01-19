//TODO: REFACTOR AND FIX SELECT VALUE WHEN PAGE LOADS
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { getAllRooms } from '../../services/rooms.services'
import AutoComplete from '../AutoComplete/AutoComplete'

const Filters = ({ setRooms, setLoading }) => {
  const navigate = useNavigate()
  const URL = useLocation()
  const [searchParams] = useSearchParams()
  const [locationInput, setLocationInput] = useState(
    searchParams.get('location')
  )
  const [priceInput, setPriceInput] = useState(searchParams.get('price'))
  const [isDoubleInput, setIsDoubleInput] = useState(
    searchParams.get('isDouble')
  )
  // Price inout values:
  const PRICE_OPTION_1 = 'Any price'
  const PRICE_OPTION_2 = '100-200'
  const PRICE_OPTION_3 = '201-300'
  const PRICE_OPTION_4 = '+300'

  const loadRooms = async () => {
    const res = await getAllRooms(URL.search)
    setRooms(res.data.rooms)
    setLoading(false)
  }
  useEffect(() => {
    loadRooms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [URL, setRooms])

  const handlePriceInputChange = (event) => {
    setPriceInput(event.target.value)

    let params = new URLSearchParams(URL.search)
    params.set('price', event.target.value)
    navigate(`${URL.pathname}?${params}`)
    if (event.target.value === 'Any price') {
      params.delete('price')
      navigate(`${URL.pathname}?${params}`)
    }
  }

  const handleIsDoubleInput = (event) => {
    setIsDoubleInput(event.target.checked)

    let params = new URLSearchParams(URL.search)
    event.target.checked
      ? params.set('isDouble', event.target.checked)
      : params.delete('isDouble')
    navigate(`${URL.pathname}?${params}`)
  }
  const accentColor = {
    accentColor: '#ffc21c',
    color: '#470862',
  }

  return (
    <div className="w-full bg-purple-dark relative py-2 px-1 sm:py-4 sm:px-6 flex flex-col justify-between sm:flex-row">
      <div className=" w-full sm:w-1/2 relative flex flex-col  ">
        <p className="sm:mb-2 text-white text-lg">Location:</p>
        <AutoComplete
          isOnFilter={true}
          URL={URL}
          locationInput={locationInput}
          setLocationInput={setLocationInput}
        />
      </div>
      <div className="flex flex-col  w-full sm:w-1/6 ">
        <label htmlFor="price" className="sm:mb-2 text-white text-lg">
          Price:
        </label>
        <select
          name="price"
          id="price"
          className="h-6 pl-2 bg-white"
          value={priceInput || PRICE_OPTION_1}
          onChange={(event) => handlePriceInputChange(event)}
        >
          <option value={PRICE_OPTION_1}>{PRICE_OPTION_1}</option>
          <option value={PRICE_OPTION_2}>{PRICE_OPTION_2}</option>
          <option value={PRICE_OPTION_3}>{PRICE_OPTION_3}</option>
          <option value={PRICE_OPTION_4}>{PRICE_OPTION_4}</option>
        </select>
      </div>
      <div className=" items-start flex flex-col sm:items-center justify-center ">
        <label htmlFor="double" className="sm:mb-2 text-white text-lg">
          Double bedroom:
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="double"
            id="double"
            checked={isDoubleInput}
            style={accentColor}
            className="outline-none border-none"
            onChange={(event) => handleIsDoubleInput(event)}
          />
          <p className="text-white ml-2">Yes</p>
        </div>
      </div>
    </div>
  )
}
export default Filters
