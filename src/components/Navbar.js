import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav1">
        <div className="container-fluid">
          <Link className="navbar-brand head1" to="/">myNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className='nav-link' aria-current="page" to="/home">Home</Link>
              </li>

            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex">
                <Link className="btn btn-primary mx-1 submit" to='/login' role="button">Login</Link>
                <Link className="btn btn-primary mx-1 submit" to='/signup' role="button">SignUp</Link>
              </form> : <button className='btn btn-primary submit' onClick={handleLogout} >Log Out</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar