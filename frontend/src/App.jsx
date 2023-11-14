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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path='home' element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="profile" element={<Profile />}/>
            <Route path="accounts" element={<Accounts />}/>
            <Route path="portfolio" element={<Portfolio />}/>
            <Route path="settings" element={<Settings />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
