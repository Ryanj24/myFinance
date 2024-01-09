import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Accounts from './Pages/Accounts/Accounts.jsx'
import Budgets from './Pages/Budgets/Budgets.jsx'
import Portfolios from './Pages/Portfolios/Portfolios.jsx'
import GoalsPage from './Pages/GoalsPage/GoalsPage.jsx'
import MainLayout from './Components/MainLayout/MainLayout.jsx'
import AccountDetails from './Pages/AccountDetails/AccountDetails.jsx'
import PortfolioDetails from './Pages/PortfolioDetails/PortfolioDetails.jsx'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector((state) => state.user.user)
  // const accounts = useSelector((state) => state.accounts)
  // const portfolios = useSelector((state) => state.portfolios)


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
            <Route path="accounts/:id" element={user ? <AccountDetails /> : <Navigate to="/login"/>}/>
            <Route path="budgets" element={user ? <Budgets /> : <Navigate to="/login"/>}/>
            <Route path="portfolios" element={user ? <Portfolios /> : <Navigate to="/login"/>}/>
            <Route path="portfolios/:id" element={user ? <PortfolioDetails /> : <Navigate to="/login"/>}/>
            <Route path="goals" element={user ? <GoalsPage /> : <Navigate to="/login"/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
