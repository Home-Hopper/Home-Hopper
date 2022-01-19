import RoomCard from '../components/RoomCard/RoomCard'
import { useState } from 'react'
import Filters from '../components/Filters/Filters'
import LoadingComponent from '../components/Loading'

const ForRent = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <main className="flex bg-purple-200 flex-col items-center">
      <Filters setRooms={setRooms} setLoading={setLoading} />
      <div className="flex items-center w-full h-full justify-center">
        <div className="flex flex-wrap justify-center  w-11/12">
          {loading && <LoadingComponent />}
          {!loading && rooms.length === 0 ? (
            <div className="flex flex-col-reverse lg:flex-row">
              <img
                src="/images/not-found.png"
                alt="not-found"
                className="lg:w-1/3 w-full"
              />
              <div className="text-purple-dark flex flex-col justify-center">
                <h2 className="text-lg font-extrabold mb-4 mt-4 lg:mt-0">
                  No results found. We were unable to locate any results
                  matching your search criteria.
                </h2>
                <h3>
                  Please amend your search options or try searching again.
                </h3>
              </div>
            </div>
          ) : (
            rooms?.map((room, index) => {
              return <RoomCard room={room} key={index + Date.now()} />
            })
          )}
          {}
        </div>
      </div>
    </main>
  )
}
export default ForRent
