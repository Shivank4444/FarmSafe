import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

export default function Login(props) {
    const [loginDetails, setLoginDetails] = useState({login:"", password:""})
    let navigate = useNavigate()

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch("https://agri-server-vfai.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(loginDetails)})
        const json = await response.json();
        console.log(json)
        if(json.flag){

            localStorage.setItem('token' , json.authToken);
            props.showAlert("Logged in Successfully","success")
            navigate("/home");
            
        }else{
          props.showAlert("Invalid Credentials, Try Again","warning")
        }
    }
    const onchange = (e)=> {
        setLoginDetails({...loginDetails, [e.target.name]: e.target.value})

    }
  return (
    <form onSubmit={handleSubmit}>
      <br />
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onchange} id="email" name="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} name="password" id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  )
}
