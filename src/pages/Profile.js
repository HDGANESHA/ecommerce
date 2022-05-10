import Sidebar from '../component/Sidebar';
import { useNavigate } from "react-router-dom";
import './Profile.css'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Checkbox, Input, Select } from 'antd';
import TextField from "@mui/material/TextField";
import $ from 'jquery';
import { useFormik } from "formik";
import * as Yup from "yup";


import {

    message
} from "antd"

// import axios from "axios";


// const data = {
//     userId: userId,
// };
// var productData = [];
// var config = {
//     method: 'post',
//     url: 'http://localhost/ecommerceapi/api/viewuserbyid.php',
//     headers: {

//         "Content-Type": 'application/json'
//     },
//     data: {
//         'userId': id
//     }
// };
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


    let navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [valv, setValv] = useState("");
    const [refresh, setRefresh] = useState(0);

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
                    setValv(result);
                    console.log(result);
                    productData = result;
                    finalResult = productData;
                    setRefresh(refresh + 1);
                    console.log(productData.userName);
                    // console.log(refresh);
                    setRefresh(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    }, [refresh]);

    const formiks = useFormik({
        initialValues: {
            userName: productData.userName,
            email: productData.email,
            phoneNumber: productData.phoneNumber,
            gender: productData.gender,
            userId: localStorage.getItem("userId")

        },
        validateOnMount: true,
        validationSchema: valSchema,
        onSubmit: (values) => {
            console.log(values);
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




    // const save = async () => {
    //     try {
    //         const row = await form.validateFields();
    //         // let data = JSON.stringify(row);
    //         // console.log(data);

    //         //Inserting form values to db
    //         fetch("http://localhost/ecommerceapi/api/edit-user.php", {
    //             body: JSON.stringify(row),
    //             method: "PUT",
    //         })
    //             .then((res) => res.json())
    //             .then(
    //                 (result) => {
    //                     if (result.message === "user was updated.") {
    //                         console.log(result);
    //                         message.success(result.message);
    //                         setRefresh(refresh + 1);
    //                         setEditingKey("");
    //                         console.log(refresh);
    //                     } else {
    //                         message.error(result.message);
    //                     }
    //                 },
    //                 (error) => {
    //                     console.log(error);
    //                     message.error("Unable to update user !!");
    //                 }
    //             );

    //     } catch (errInfo) {
    //         console.log("Validate Failed:", errInfo);
    //     }
    // };
    var configg = {
        method: 'put',
        url: 'http://localhost/ecommerceapi/api/edit-user.php',
        headers: {

            'Content-Type': 'application/json'
        },
        data: ""
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        navigate('../../');
    }
    const fun = {
        marginLeft: '200px'
    }
    // const sub = () => {
    //     if ($("#password2").val() != $("#password3").val()) {
    //         $("#checkpass").text("password not matching")
    //     }
    //     else {
    //         $("#checkpass").text("password  matching")
    //     }
    // }
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
    // <Formik
    //     initialValues={{
    //         oldPassword: "",
    //         passwords: "",
    //         newPassword: "",
    //         userId: localStorage.getItem("userId"),
    //     }}
    //     validationSchema={Schema}
    //     onSubmit={(values) => {
    //         console.log("checking");
    //         setIsSubmitting(true);
    //         console.log(JSON.stringify(values, null, 2));
    //         instance
    //             .post(
    //                 "MyProfile/change-password.php",
    //                 JSON.stringify(values, null, 2)
    //             )
    //             .then((response) => {
    //                 console.log(response.data.message);
    //                 if (response.data.message === "Password updated.") {
    //                     message.success(response.data.message);

    //                     setIsSubmitting(false);
    //                 } else {
    //                     message.error(response.data.message);

    //                     setIsSubmitting(false);
    //                 }
    //             })
    //             .catch((error) => {
    //                 message.error("Try again later");
    //                 //formik.resetForm()
    //                 setIsSubmitting(false);
    //             });
    //     }}
    // />


    return (
        <>
            console.log(val);
            <Sidebar />
            <div className="alfi">
                <div className="headerbox">
                    <h1 style={inp}>Welcome Ganesh</h1>
                    <button className="clkbtn" onClick={move}>Sign Out</button>

                </div>
            </div>

            <div className="content">
                <form onSubmit={formiks.handleSubmit}>
                    <div className="containers">
                        <div className='card' id='prid'>
                            <h1>Edit Profile</h1>
                            <TextField
                                // fullWidth
                                id="userName"
                                name="userName"
                                label="User Name"
                                defaultValue={productData.userName}
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


                            {/* <label htmlFor="userName"><b>User Name</b></label>
                            <input type="string" name="userName" id="userName" defaultValue={productData.userName} required />
                            <br/>
                            <br />
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="email" name="email" id="email" defaultValue={productData.email} required />
                            <br />
                            <br />
                            <label htmlFor="phoneNumber"><b>Phone Number</b></label>
                            <input type="number" name="phoneNumber" id="phoneNumber" defaultValue={productData.phoneNumber} required /> */}

                            <label for="gender">Gender:</label>
                            <select name="gender" id="gender" defaultValue={productData.gender} onChange={formiks.handleChange}>
                                <option value="men">Men</option>
                                <option value="women">Women</option>

                            </select>
                            <br />
                            <br />
                            <button type="submit" className="registerbtn" id='btnlgr'>Submit</button>
                            <Button type="primary" onClick={showModal} style={fun}>
                                Edit Password
                            </Button>
                        </div>

                    </div>
                </form>

            </div>



            <Modal title="User Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <div className="containers">
                    <form onSubmit={formik.handleSubmit}>

                        <TextField type="password" label="current Password" name="oldPassword" id="password1" onChange={formik.handleChange}
                            onBlur={check} error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}  />
                        {/* <span className="error" style={{ color: "red" }}>
                            {errors.oldPassword}
                        </span> */}
                        <br />
                        <br />

                        <TextField type="password" name="passwords" label="new Password" id="password2" onChange={formik.handleChange} onBlur={print} helperText={formik.touched.passwords && formik.errors.passwords} error={formik.touched.passwords && Boolean(formik.errors.passwords)} />
                        <br />
                        <br />

                        <TextField type="password" name="newPassword" label="confirm Password" id="password3" onChange={formik.handleChange} helperText={formik.touched.newPassword && formik.errors.newPassword} error={formik.touched.newPassword && Boolean(formik.errors.newPassword)} />
                        <br />
                        <br />
                        <span id="checkpass"></span>
                        <br />
                        <button type="submit" className="registerbtn">Submit</button>
                    </form>



                </div>



            </Modal>

        </>);
}

export default Profile;