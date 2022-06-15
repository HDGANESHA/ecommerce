import Sidebar from '../component/sidebar';
import { useNavigate } from "react-router-dom";
import './Profile.css'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Checkbox, Input, Select } from 'antd';
import TextField from "@mui/material/TextField";
import $ from 'jquery';
import { useFormik } from "formik";
import * as Yup from "yup";
import Buttons from "@mui/material/Button";
import { ChangePasswordForm } from './changePasswordForm';
import axios from "axios";
import Card from '@mui/material/Card';

import {

    message
} from "antd"


const valSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phoneNumber: Yup
        .string('Enter your phoneNumber')
        .min(10, 'phoneNumber should be of 10 number length')
        .max(10, 'phoneNumber should be of 10 number length')
        .required('phoneNumber is required'),
    userName: Yup
        .string('Enter your userName')
        .min(3, 'userName should be of 3 character length')
        .max(10, 'userName should be of 10 number length')
        .required('userName is required'),
});
var productData = [];

var finalResult = [];
function Profile() {
    const [visible, setVisible] = useState(false);
    // const [productData, setProductData] = useState("");
    let navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valv, setValv] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [detail, setDetail] = useState("");

    const Schema = Yup.object().shape({
        oldPassword: Yup.string("Enter your current password")

            .required("Current Password is required"),
        passwords: Yup.string("Enter your new password")
            .min(6, "Password should be of minimum 6 characters length")
            .max(15, "Password should be of maximum 15 characters length")
            .required("New password is required")

            .matches(/[A-Z].*[A-Z]/, "must contain two uppercase characters")
            .matches(/[a-z].*[a-z]/, "must contain 2 lowercase characters")
            .matches(/[!@#$%^&()-=+{};:,<.>]{0,2}/, "atmost 2 special characters"),



        newPassword: Yup.string("Confirm Password")
            .oneOf([Yup.ref("passwords"), null], "Passwords must match")
            .required("Password is required"),
    });
    useEffect(() => {
        console.log("checking");
        fetch("http://localhost/ecommerceapi/api/viewuserbyid.php", {
            body: JSON.stringify({ userId: localStorage.getItem('userId') }),

            method: "POST",
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    console.log(result);

                    setDetail(result);
                   
                   

                },

                (error) => {
                    console.log(error);
                }
            );
    }, [localStorage.getItem('userId')]);
    // productData = detail;
  
    console.log(JSON.stringify(productData));
    const formiks = useFormik({
        initialValues: {
            userName: productData.userName,
            email: productData.email,
            phoneNumber: productData.phoneNumber,
            gender: productData.gender,
            userId: localStorage.getItem("userId")
            // detail

        },
        validateOnMount: true,
        validationSchema: valSchema,
        onSubmit: (values) => {
            console.log(values);
            console.log("inside onSubmit");

            fetch("http://localhost/ecommerceapi/api/edit-user.php", {
                body: JSON.stringify(values),

                method: "PUT",
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        if (result.message === "user was edited.") {
                            console.log(result);
                            message.success(result.message);
                            // setRefresh(refresh + 1);

                            // console.log(refresh);
                            // setRefresh(false);
                        } else {
                            message.error(result.message);
                        }
                    },
                    (error) => {
                        console.log(error);
                        message.error("Unable to update user !!");
                    }
                );
        }
    });


    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            passwords: "",
            newPassword: "",
            userId: localStorage.getItem("userId")


        },

        validateOnMount: true,
        validationSchema: Schema,
        onSubmit: (values) => {
            console.log(values);
            finalResult.passwords = values.passwords;
            console.log(finalResult)
            fetch("http://localhost/ecommerceapi/api/edit-user.php", {
                body: JSON.stringify(finalResult),

                method: "PUT",
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        if (result.message === "Password was updated.") {
                            console.log(result);
                            message.success(result.message);
                            // setRefresh(refresh + 1);

                            // console.log(refresh);
                            // setRefresh(false);
                        } else {
                            message.error(result.message);
                        }
                    },
                    (error) => {
                        console.log(error);
                        message.error("Unable to update password !!");
                    }
                );
        }
    });

  

    var configg = {
        method: 'put',
        url: 'http://localhost/ecommerceapi/api/edit-user.php',
        headers: {

            'Content-Type': 'application/json'
        },
        data: ""
    };

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        localStorage.clear();
        navigate('../../');
    }
    const fun = {
        marginLeft: '200px'
    }

    const check = (e) => {
        console.log(e.target.value);
        console.log(productData.userName);
        if (e.target.value == productData.passwords) {
            message.success("Password matched")
        }
        else {
            message.error("Password not matching")
        }
    }

    const print = (e) => {
        console.log(e.target.value);
    }
    const onCreate = (values) => {
        console.log("Received values of form: ", values);
        var configpass = {
            method: "put",
            url: "http://localhost/ecommerceapi/api/edit-user.php",
            headers: {

                "Content-Type": "application/json",
            },
            data: JSON.stringify(values)
        };
        axios(configpass)
            .then(function (response) {
                console.warn(response.status);
                alert(response.message);
            })
            .catch(function (error) { });

    }
    const handleCancel = () => {
        console.log("Clicked cancel button");

        //formik.resetForm();

        setVisible(false);
    };

    const checklen = {
        width: '150px',
        height: '30px'
    }

    return (
        <>

            <div className='modif'>

                <div className="content">
                    <form onSubmit={formiks.handleSubmit}>
                        <div className="containers">
                            <Card >
                                {/* <div className='card' id='prid'> */}
                                <h1>Edit Profile</h1>
                                <TextField
                                    // fullWidth
                                    id="userName"
                                    name="userName"
                                    label="User Name"
                                    defaultValue={detail.userName}
                                    onChange={formiks.handleChange}
                                    error={formiks.touched.userName && Boolean(formiks.errors.userName)}
                                    helperText={formiks.touched.userName && formiks.errors.userName}
                                />
                                <br />
                                <TextField
                                    // fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={productData.email}
                                    onChange={formiks.handleChange}
                                    error={formiks.touched.email && Boolean(formiks.errors.email)}
                                    helperText={formiks.touched.email && formiks.errors.email}
                                />
                                <br />
                                <TextField
                                    // fullWidth
                                    id="phoneNumber"

                                    name="phoneNumber"
                                    label="Phone Number"

                                    defaultValue={productData.phoneNumber}
                                    onChange={formiks.handleChange}
                                    error={formiks.touched.phoneNumber && Boolean(formiks.errors.phoneNumber)}
                                    helperText={formiks.touched.phoneNumber && formiks.errors.phoneNumber}
                                />
                                <br />




                                <label for="gender">Gender:</label>
                                <select name="gender" id="gender" defaultValue={productData.gender} onChange={formiks.handleChange} style={checklen}>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>

                                </select>
                                <br />
                                <br />
                                <button type="submit" className="registerbtn" id='btnlgr'>Submit</button>
                                <Buttons
                                    onClick={() => {
                                        setVisible(true);
                                    }}
                                >
                                    Change Password
                                </Buttons>
                                <ChangePasswordForm
                                    visible={visible}
                                    onCreate={onCreate}
                                    onCancel={handleCancel}
                                />
                                {/* </div> */}
                            </Card>
                        </div>
                    </form>

                </div>
            </div>




        </>);
}

export default Profile;