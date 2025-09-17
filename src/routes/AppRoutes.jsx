import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from '~/pages/Home'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
