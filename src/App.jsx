import react from "react"
import './App.css'
import Body from "./components/Body.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login.jsx"

function App() {

  return(
    <div>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/Login" element={<Login/>}/>
        </Route> 
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
