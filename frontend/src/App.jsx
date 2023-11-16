import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Accounts from './Pages/Accounts/Accounts.jsx'
import Portfolio from './Pages/Portfolio/Portfolio.jsx'
import Settings from './Pages/Settings/Settings.jsx'
import MainLayout from './Components/MainLayout/MainLayout.jsx'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector((state) => state.user.user)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LandingPage />}/>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home/dashboard"/>}/>
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/home/dashboard"/>}/>
          <Route path='/home' element={user ? <MainLayout /> : <Navigate to="/login"/>}>
            <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>}/>
            <Route path="profile" element={user ? <Profile /> : <Navigate to="/login"/>}/>
            <Route path="accounts" element={user ? <Accounts /> : <Navigate to="/login"/>}/>
            <Route path="portfolio" element={user ? <Portfolio /> : <Navigate to="/login"/>}/>
            <Route path="settings" element={user ? <Settings /> : <Navigate to="/login"/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
