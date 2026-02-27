import { Navigate, Route, Routes } from 'react-router-dom'
import DogDashboard from './pages/DogDashboard'
import ListTaskPage from './pages/ListTaskPage'
import TaskFormPage from './pages/TaskFormPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/dogs" element={<DogDashboard />} />
      <Route path="/tasks" element={<TaskFormPage />} />
      <Route path="/tasks/list" element={<ListTaskPage />} />
      <Route path="/" element={<Navigate to="/tasks" replace />} />
    </Routes>
  )
}

export default App
