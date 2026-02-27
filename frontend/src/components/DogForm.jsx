import { useState } from 'react'
import { API_BASE_URL } from '../common/constants'

function DogForm({ onDogAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          breed: formData.breed,
          age: Number(formData.age),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add dog')
      }

      setFormData({ name: '', breed: '', age: '' })
      await onDogAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="breed">Breed</label>
        <input
          id="breed"
          name="breed"
          type="text"
          value={formData.breed}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min="0"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Add Dog'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  )
}

export default DogForm
