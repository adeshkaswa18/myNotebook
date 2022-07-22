import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // save authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged In Successfully", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
          <h2>Welcome to myNotebook</h2>
          <div className="main">
          <p className='sign' align="center">Sign in to myNotebook</p>
          <form className="form1" onSubmit={handleSubmit} >
            <div className="mb-3">
                <input type="email" className="form-control un" align="center" placeholder='Username'  value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control pass" placeholder='Password' value={credentials.password} onChange={onChange} name='password' id="password" />
            </div>
            <button type="submit" className="btn btn-primary submit">Sign in</button>
           </form>
          </div> 
        </>
       
    )
}

export default Login