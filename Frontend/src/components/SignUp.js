import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function SignUp(props) {

    const [signup, setSignUp] = useState({name:"",email:"", password:"", cpassword:""})
    let navigate = useNavigate()

    const handleSubmit = async (e)=> {
        const {name, email, password, cpassword } = signup;
        e.preventDefault();
        if(password!==cpassword){ return props.showAlert('Password does not match','warning')}
        const response = await fetch("https://agri-server-vfai.onrender.com/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify({name, email, password})})
        const json = await response.json();
        console.log(signup)
        console.log(json)
        if(json.success){

            localStorage.setItem('token' , json.authToken);
            props.showAlert("Account created Successfully","success")
            navigate("/home");
            
        }else{
          props.showAlert("Invalid Credentials","warning")
        }
    }
    const onchange = (e)=> {
        setSignUp({...signup, [e.target.name]: e.target.value})

    }
  return (
    <form onSubmit={handleSubmit}>
      <br />
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input style={{ background: "white" }} type="text" className="form-control" onChange={onchange} required minLength={3} id="name" name="name" />
  </div>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onchange} required id="email" name="email" />
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} minLength={5} required name="password" id="password"/>
  </div>
  <div className="mb-3">
    <label for="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" className="form-control" onChange={onchange} minLength={5} required name="cpassword" id="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >SignUp</button>
</form>
  )
}
