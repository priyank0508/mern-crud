import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
        <div class="navbar fixed-bottom navbar-expand-lg navbar-primary bg-primary">
            <div class="">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link className='m-3 text-white' to='/'>Home</Link>
                    <Link className='m-3 text-white' to='/terms-condition'>Terms & Condition</Link>
                    <Link className='m-3 text-white' to='/privacy-policy'>Privacy & Policy</Link>
                </li>
                </ul>
            </div>
        </div>
    </>

  )
}

export default Footer