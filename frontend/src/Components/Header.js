import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <>
        <div class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div class="">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link to='/register' class="btn btn-primary m-2">Register</Link>
                </li>
                <li class="nav-item">
                <Link to='/login' class="btn btn-primary m-2">Login</Link>
                </li>
                </ul>
            </div>
        </div>
    </>

  )
}

export default Header