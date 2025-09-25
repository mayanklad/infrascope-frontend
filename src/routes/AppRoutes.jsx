import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from '~/pages/Home'
import Graphpage from '~/pages/Graph'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/graph' element={<Graphpage />} />
      </Routes>
    </BrowserRouter>
  )
}
