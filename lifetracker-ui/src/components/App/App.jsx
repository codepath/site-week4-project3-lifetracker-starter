import Register from '../Register/Register'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route 
          path='/auth/register'
          element={<Register/>}
        />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
