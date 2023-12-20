import React, { createContext, useState } from 'react';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import { Home } from "./pages/Home"
import { Memory } from "./pages/Memory"
import './Css/sidebar.css'
import Login from "./pages/Login"
import './firebase'
import UserAuthContext from './context/UserAuthContext';
import Folder from './pages/Folder';
import SideBar from './sidebar'
import File from './pages/File';
import Related from './pages/Related';
import SignIn from './pages/SignIn';
import Subscription from './pages/Subscription';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings'
import Policies from './pages/Policies/Policies';
import Legal from './pages/Policies/Legal';
import TermsUse from './pages/Policies/TermsServicies';
import PrivacyPolicy from './pages/Policies/Privacy';
import AcceptableUse from './pages/Policies/AcceptableUse';
import Security from './pages/Policies/Security';
import Cookie from './pages/Policies/Cookie';
import Contact from './pages/Policies/Contact';
import Feedback from './pages/Policies/Feedback';


export const ThemeContext = createContext(null)

function App() {

const [folderUrl, setFolderUrl] = useState("")
const [mFileUrl, setMFileUrl] = useState("")

//THEME SWITCH
const [theme, setTheme] = useState(()=> localStorage.getItem('theme') || 'light');;

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};

return (

<ThemeContext.Provider value={{ theme, toggleTheme}}>
  <div className='app' id={theme}>
    <UserAuthContext>
      <Router>
        <SideBar themeSwitch={toggleTheme}/>
        <Routes>
          <Route path='/settings' element={<Settings />}/>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/policies/legal/acceptable-use-policy" element={<AcceptableUse />} />
          <Route path="/policies/legal/cookie-policy" element={<Cookie/>} />
          <Route path="/support/contact-us" element={<Contact />} />
          <Route path="/support/feedback" element={<Feedback/>} />
          <Route path="/policies/security" element={<Security />} />
          <Route path="/policies/legal" element={<Legal />} />
          <Route path="/policies/legal/terms" element={<TermsUse />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/register" element={<Login />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/" element={<Home folderUrl={setFolderUrl}/>} />
          <Route path='/folder/:id' element={<Folder folderURL={setFolderUrl}/>}/>
          <Route path='/folder/:id/:id' element={<File prevUrl={folderUrl} mainFileURL={setMFileUrl}/>}/>
          <Route path='/folder/:id/:id/:id' element={<Related mainFileURL={mFileUrl} prevUrl={folderUrl} />}/>
        </Routes>
      </Router>
    </UserAuthContext>
  </div>
</ThemeContext.Provider >

)}

export default App
