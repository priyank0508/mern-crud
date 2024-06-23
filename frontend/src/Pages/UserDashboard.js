import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/userDashboard.css'
import EditProfile from './EditProfile'


const UserDashboard =() => {
    const [userData, setUserData] = useState({})
    const [editUser, setEditUser] = useState(false)

    const token = localStorage.getItem('token')
    const config = { headers: {"Authorization" : `Bearer ${token}`} } 

    const fetchUserDetails = async () => {
      const user = await axios.get(`${process.env.REACT_APP_URL}/user/get-users-by-id`, config ) 
      setUserData(user?.data?.data[0]);
    }

    useEffect(() => {
      fetchUserDetails()
    }, [])
    
  return (
    <>
    <table className="user-details-table mt-4">
      <thead>
        <tr>
          <th>Profile Image</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Type</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td className='w-1'>
             <img 
             src={`${process.env.REACT_APP_IMG_URL}/${userData?.profileImage}`} 
             crossOrigin="anonymous" 
             alt="No image"
             className='profile-image'
              />
            </td>
            <td>{userData.firstName}</td>
            <td>{userData.lastName}</td>
            <td>{userData.email}</td>
            <td>{userData.userType}</td>
          </tr>
      </tbody>
    </table>
      <Link 
        className=' btn btn-primary m-3 text-white' 
        to='/user-update'
        onClick={() => setEditUser((pre) => !pre)}
        >
          Edit Profile
      </Link>
      { editUser && <EditProfile data={userData}/>  }
    </>
  )
}

export default UserDashboard