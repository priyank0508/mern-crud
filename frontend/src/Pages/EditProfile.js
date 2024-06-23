import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(null);

  const token = localStorage.getItem('token')
  const config = { headers: {"Authorization" : `Bearer ${token}`} }
  const userData = JSON.parse(localStorage.getItem('userData'))
    const initialValue = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
    }

    const registerValidation = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
    })

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: registerValidation,
        onSubmit: async (values) => {
          const payload = {
            ...values,
            userId: userData?._id
          }
          const updateUser = await axios.post(`${process.env.REACT_APP_URL}/user/update-user`, payload, config)
        
          if(!updateUser?.data?.status){
            toast.error(updateUser?.data?.message);
          }else {
            toast.success(updateUser?.data?.message);
          }

          if(newImage) {
            const formData = new FormData()
            formData.append('profileImage', newImage)
            formData.append('oldImage', userData.profileImage)
            const updateImage = await axios.post(`${process.env.REACT_APP_URL}/user/update-user-profile-image`,formData,config )
            if(!updateImage?.data?.status){
              toast.error(updateImage?.data?.message);
            } else {
              toast.success(updateImage?.data?.message);
            }
          }
            navigate("/user-dashboard");

        },
      });
    return (
    <div className='col-4 m-5'>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label >First Name</label>
                <input 
                type='text'
                className="form-control"
                id="firstName"
                name="firstName"    
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="Enter first name" 
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <span className="text-danger">{formik.errors.firstName}</span>
                ) : null}
            </div>
            <div className="form-group">
                <label >Last Name</label>
                <input 
                type='text'
                className="form-control"
                id="lastName"
                name="lastName"    
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Enter last name" 
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <span className="text-danger">{formik.errors.lastName}</span>
                ) : null}
            </div>
            <div className="form-group">
                <label >Profile Image</label>
                <input 
                type='file'
                className="form-control"
                id="lastName"
                name="lastName"    
                onChange={(event) => {
                    setNewImage(event.currentTarget.files[0]);
                }}
                placeholder="Enter last name" 
                />
                
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    </div>
    )
}

export default EditProfile
