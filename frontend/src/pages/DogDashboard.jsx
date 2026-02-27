import { useCallback, useEffect, useState } from 'react'
import DogForm from '../components/DogForm'
import DogList from '../components/DogList'
import { API_BASE_URL } from '../common/constants'

function DogDashboard() {
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDogs = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/dogs`)

      if (!response.ok) {
        throw new Error('Failed to fetch dogs')
      }

      const data = await response.json()
      setDogs(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDogs()
  }, [loadDogs])

  if (loading) {
    return <p>Loading dogs...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main>
      <h1>Dog Listing</h1>
      <DogForm onDogAdded={loadDogs} />
      <DogList dogs={dogs} />
    </main>
  )
}

export default DogDashboard
