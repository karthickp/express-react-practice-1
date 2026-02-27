import { useState } from 'react'
import { API_BASE_URL } from '../common/constants'

function TaskFormPage() {
  const [formData, setFormData] = useState({
    title: '',
    status: 'open',
    priority: '3',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

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
    setSuccessMessage('')

    const trimmedTitle = formData.title.trim()
    const numericPriority = Number(formData.priority)

    if (!trimmedTitle) {
      setError('Title is required.')
      setSubmitting(false)
      return
    }

    if (!['open', 'done'].includes(formData.status)) {
      setError('Status must be open or done.')
      setSubmitting(false)
      return
    }

    if (!Number.isInteger(numericPriority) || numericPriority < 1 || numericPriority > 5) {
      setError('Priority must be between 1 and 5.')
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: trimmedTitle,
          status: formData.status,
          priority: numericPriority,
        }),
      })

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null)
        const errorMessage = responseBody?.error || 'Failed to add task'
        throw new Error(errorMessage)
      }

      setFormData({
        title: '',
        status: 'open',
        priority: '3',
      })
      setSuccessMessage('Task added successfully.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="open">open</option>
            <option value="done">done</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Task'}
        </button>

        {error && <p>Error: {error}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </main>
  )
}

export default TaskFormPage
