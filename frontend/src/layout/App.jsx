import { Route, Router, Routes } from 'react-router-dom'
import '../style/App.css'
import SharedLayout from '../sharedlayout/SharedLayout'
import HomePage from '../pages/HomePage'



function App() {
  return (
    <Routes>
    <Route path='/' element={ <SharedLayout /> } >
      <Route path='/' element={ <HomePage /> } />
    </Route>
  </Routes>
  )
}

export default App
