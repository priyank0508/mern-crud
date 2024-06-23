import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const initialValue = {
        email: "",
        password: "",
    }
    const loginValidation = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email address is Required"),
        password: Yup.string().required("Password is required"),
    })
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: loginValidation,
        onSubmit: async (values) => {
          const payload = {
            ...values,
          }
          console.log('payload :>> ', payload);
          const user = await axios.post(`${process.env.REACT_APP_URL}/auth/login`, payload)
          console.log('user :>> ', user.data.data[0]);
          if(!user?.data?.status){
            Swal.fire({
                title: user?.data?.message,
                icon: 'error'
            })
          }else {
            localStorage.setItem("userData", JSON.stringify(user?.data?.data[0]));
            localStorage.setItem("token", user?.data?.data[0]['token']);
            Swal.fire({
                title: user?.data?.message,
                icon: 'success'
            })
            navigate("/user-dashboard");
          }
        },
      });
    return (
    <div className='col-4 m-5'>
        <form onSubmit={formik.handleSubmit}>
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
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    </div>
    )
}

export default Login