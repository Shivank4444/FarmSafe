import React from 'react'
import {
    Link, useLocation,
    useNavigate
  } from "react-router-dom";
import './style.css'

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">FarmSafe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/listings">All Listings</Link>
        </li>
        
        </ul>
        {!localStorage.getItem('token')?<><Link role="button" to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link role="button" to="/signup" className="btn btn-outline-primary mx-2">SignUp</Link></>:<button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
        
    </div>
  </div>
</nav>
  )
}
