import LocationInfo from './components/LocationInfo'
import { useEffect, useState } from 'react'
import getRandomNumber from './utils/getRandomNumber'
import ResidentCard from './components/ResidentCard'
import './App.css'
import FormLocation from './components/FormLocation'
import useFetch from './hooks/useFetch'

function App() {

  const [idLocation, setidLocation] = useState(getRandomNumber(126))
  
  const url = `https://rickandmortyapi.com/api/location/${idLocation}`
  const [ location, getSingleLocation, hasError, isLoading   ] = useFetch(url)

  useEffect (() => {
    getSingleLocation()
  }, [idLocation])

  console.log(location)

  return (
    <div>
      <div className='container'>
        <FormLocation 
          setidLocation={setidLocation}
        />
        {
          isLoading
          ? (<h2>Loading...</h2>)
          : (
            hasError
            ? (<h1>❌Hey! you mus provide an id from 1 to 126😢</h1>)
            : (
              <>
                <LocationInfo 
                  location={location}
                />
                <div className='resident-container'>
                  { 
                    location?.residents.map(url => (
                      <ResidentCard 
                        key={url}
                        url={url}
                      />
                    ))
                  }
              </div>
            </>
            )
          )        
        }
        
      </div>
    </div>
  )
}

export default App
