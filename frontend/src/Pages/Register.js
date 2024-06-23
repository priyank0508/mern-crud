import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import Swal from 'sweetalert2'

function Register() {
    const initialValue = {
        firstName: "",
        lastName: "",
        email: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const registerValidation = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email address").required("Email address is Required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Confirm password is required"),
    })
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: registerValidation,
        onSubmit: async (values) => {
          const payload = {
            ...values,
          }
          console.log('payload :>> ', payload);
          const user = await axios.post(`${process.env.REACT_APP_URL}/auth/register`, payload)
          console.log('user :>> ', user.data.data[0]);
          if(!user?.data?.status){
            Swal.fire({
                title: user?.data?.message,
                icon: 'error'
            })
          }else {
            Swal.fire({
                title: user?.data?.message,
                icon: 'success'
            })
          }
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
                <label >Email address</label>
                <input 
                type='text'
                className="form-control"
                id="email"
                name="email"    
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter email" 
                />
                {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                ) : null}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="password"
                name="password" 
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password" 
                />
                {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">{formik.errors.password}</span>
                ) : null}
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="confirmPassword"
                name="confirmPassword" 
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                placeholder="Confirm Password" 
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <span className="text-danger">{formik.errors.confirmPassword}</span>
                ) : null}
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    </div>
    )
}

export default Register