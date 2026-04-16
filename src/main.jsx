import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegistrationPage from './Pages/RegistrationPage'
import AboutusPage from './Pages/AboutPage'
import MainMenu from './Pages/MainMenu'
import Messages from './Pages/Messages'
import Settings from './Pages/Settings'
import People from './Pages/People'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/registration' element={<RegistrationPage/>} />
      <Route path='/about' element={<AboutusPage/>} />
      <Route path='/mainmenu' element={<MainMenu/>} />
      <Route path='/messages' element={<Messages/>} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='/people' element={<People/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
