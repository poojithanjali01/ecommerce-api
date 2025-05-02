import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AppRoutes from './AppRoutes' // Create this file if you haven't

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App