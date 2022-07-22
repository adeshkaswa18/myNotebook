import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // save authtoken and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <h2>Welcome to myNotebook</h2>

      <div className='main2' >
        <p className='sign' align="center">SignUp to myNotebook</p>
        <form className="form1" onSubmit={handleSubmit} >
          <div className="">
            <input type="text" className="form-control un" placeholder='Enter Your Name' onChange={onChange} name="name" id="name" />
          </div>
          <div className="">
            <input type="email" className="form-control un" placeholder='Email' onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
          </div>
          <div className="">
            <input type="password" className="form-control pass" placeholder='Password' onChange={onChange} name='password' id="password" minLength={5} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control pass" placeholder='Confirm Password' onChange={onChange} name='cpassword' id="cpassword" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup