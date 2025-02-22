import React,{ useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,Routes,
} from 'react-router-dom'
import Navbar from "./components/Navbar";
import './style.css'
import AdminDash from './views/admin-dash'
import Dashboard from './views/dashboard'
import Home from './views/home'
import NotFound from './views/not-found'
import NoteState from './context/notes/NoteState'
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Alert from "./components/Alert";
import Allnote from "./components/AllListing";
import Homes from "./components/Home"

const App = () => {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({msg:message, type:type})
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <NoteState>
    <Router>
    <Navbar />
    <Alert alert={alert} />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/admin-dash' element={<AdminDash/>}/>
        <Route component={NotFound} path="**" />
        <Route exact path='/login' element={<Login showAlert={showAlert} />}/>
        <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>}/>
        <Route exact path='/listings' element={<Allnote/>}/>
        <Route exact path='/home' element={<Homes showAlert={showAlert}/>}/>
        
      </Routes>
    </Router>
    </NoteState>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
