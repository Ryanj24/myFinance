import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>

          {/* <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/profile" element={<UserProfile />}/>
          <Route path="/accounts" element={<Accounts />}/>
          <Route path="/stockportfolios" element={<Portfolio />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
