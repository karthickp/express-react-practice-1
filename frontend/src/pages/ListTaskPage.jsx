import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../common/constants'

function ListTaskPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`)

        if (!response.ok) {
          const responseBody = await response.json().catch(() => null)
          const errorMessage = responseBody?.error || 'Failed to fetch tasks'
          throw new Error(errorMessage)
        }

        const data = await response.json()
        setTasks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  if (loading) {
    return <p>Loading tasks...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main>
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default ListTaskPage
