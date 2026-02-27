import { Navigate, Route, Routes } from 'react-router-dom'
import DogDashboard from './pages/DogDashboard'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/dogs" element={<DogDashboard />} />
      <Route path="/" element={<Navigate to="/dogs" replace />} />
    </Routes>
  )
}

export default App
