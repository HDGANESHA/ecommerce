
import React from "react";
import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    passwords: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .max(15, 'Password should be of maximum 15 characters length')
        .required('Password is required'),
});

function Login() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            passwords: '',
        },
        validateOnMount: true,
        validationSchema: validationSchema,

        onSubmit: (values) => {
            setIsSubmitting(true);
            console.log(JSON.stringify(values, null, 2));
            axios.post("http://localhost/ecommerceapi/api/login.php",
                JSON.stringify(values)
            )
                .then(function (response) {
                    console.log(response.data.data.userName);
                    console.warn(response.status);
                    if (response.data.jwt) {

                        localStorage.setItem('token', response.data.jwt);
                        localStorage.setItem('userId', response.data.data.userId);
                        localStorage.setItem('userName', response.data.data.userName);
                        localStorage.setItem("isAuthenticated", "true");
                        navigate('/pages/dashboardNew');
                    }
                    else {
                        alert('Invalid Credentials Please try again');
                        setIsSubmitting(false);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });


    return (
        <div className="container">
            <div className="card">
                <div className="form">
                    <div className="right-side">
                        <div className="register">
                            <p>Not a member? <a href="#">Register Now</a></p>
                        </div>

                        <div className="hello">
                            <h2>Admin Login</h2>

                        </div>
                        <div className="login-form">
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="lgemail"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <br />
                                <TextField
                                    fullWidth
                                    id="lgpasswords"
                                    name="passwords"
                                    label="Password"
                                    type="password"
                                    value={formik.values.passwords}
                                    onChange={formik.handleChange}
                                    error={formik.touched.passwords && Boolean(formik.errors.passwords)}
                                    helperText={formik.touched.passwords && formik.errors.passwords}
                                />
                                <Button className="btn" color="primary" variant="contained" fullWidth type="submit" disabled={!formik.isValid || isSubmitting}>
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Login;