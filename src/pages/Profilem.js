import Sidebar from "../../components/Sidebar";
import React, { useState, useEffect } from "react";
import HeaderBstore from "../../components/HeaderBstore";
import "react-confirm-alert/src/react-confirm-alert.css";
import instance from "../../components/Axios-Instance";
import "../My-Profile/MyProfile.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineUser, AiOutlineEye } from "react-icons/ai";
import { Modal, Result, Button, Input, message } from "antd";
import profilepic from "../../assets/images/common_profile_pic.png"

function MyProfile() {
    const [visible, setVisible] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState(0);

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

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        formik.resetForm();
        setVisible(false);
    };
    useEffect(() => {
        instance
            .post("MyProfile/profile-details.php", {
                userId: localStorage.getItem("userId"),
            })
            .then((response) => {
                console.log(response.data);
                const userId = response.data.userId;
                setData(response.data);
                setRefresh(refresh + 1);
                console.log(refresh);
                setRefresh(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refresh]);

    const editDetails = () => {

    };

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            passwords: "",
            newPassword: "",
            userId: localStorage.getItem("userId"),
        },
    });

    const token = localStorage.getItem("JWT-Token");
    if (token) {
        return (
            <>
                <HeaderBstore />
                <div className=" bstore-heading">
                    <AiOutlineUser /> My Profile
                </div>
                <div className="row">
                    <div className="col-2 menu">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-8">
                                <h1 className="headerheading ">
                                    <Button className="button" onClick={editDetails}>
                                        Edit Details
                                    </Button>

                                    <Button className="button-m" onClick={showModal}>
                                        Change Password
                                    </Button>

                                    <Modal
                                        title="Change Password"
                                        visible={visible}
                                        footer={null}
                                        onCancel={handleCancel}
                                    >
                                        <Formik
                                            initialValues={{
                                                oldPassword: "",
                                                passwords: "",
                                                newPassword: "",
                                                userId: localStorage.getItem("userId"),
                                            }}
                                            validationSchema={Schema}
                                            onSubmit={(values) => {
                                                console.log("checking");
                                                setIsSubmitting(true);
                                                console.log(JSON.stringify(values, null, 2));
                                                instance
                                                    .post(
                                                        "MyProfile/change-password.php",
                                                        JSON.stringify(values, null, 2)
                                                    )
                                                    .then((response) => {
                                                        console.log(response.data.message);
                                                        if (response.data.message === "Password updated.") {
                                                            message.success(response.data.message);

                                                            setIsSubmitting(false);
                                                        } else {
                                                            message.error(response.data.message);

                                                            setIsSubmitting(false);
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        message.error("Try again later");
                                                        //formik.resetForm()
                                                        setIsSubmitting(false);
                                                    });
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                handleSubmit,
                                                handleChange,
                                                handleBlur,
                                                resetForm,
                                                isValid,
                                            }) => {
                                                return (
                                                    <form onSubmit={handleSubmit} className="form">
                                                        <br />
                                                        <div className="input-containers">
                                                            <label>Current Password</label>
                                                            <br />
                                                            <input
                                                                type="password"
                                                                name="oldPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.oldPassword}
                                                                error={
                                                                    formik.touched.oldPassword &&
                                                                    Boolean(formik.errors.oldPassword)
                                                                }
                                                            />
                                                            <br />
                                                            <span className="error" style={{ color: "red" }}>
                                                                {errors.oldPassword}
                                                            </span>
                                                        </div>

                                                        <br />
                                                        <div className="input-containers">
                                                            <label>New Password</label>
                                                            <br />
                                                            <input
                                                                type="password"
                                                                name="passwords"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.passwords}
                                                                error={
                                                                    formik.touched.passwords &&
                                                                    Boolean(formik.errors.passwords)
                                                                }
                                                            />
                                                            <br />
                                                            <span className="error" style={{ color: "red" }}>
                                                                {errors.passwords}
                                                            </span>
                                                        </div>
                                                        <br />
                                                        <div className="input-containers">
                                                            <label>Confirm Password</label>
                                                            <br />
                                                            <input
                                                                type="password"
                                                                name="newPassword"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.newPassword}
                                                                error={
                                                                    formik.touched.newPassword &&
                                                                    Boolean(formik.errors.newPassword)
                                                                }
                                                            />
                                                            <br />
                                                            <span className="error" style={{ color: "red" }}>
                                                                {errors.newPassword}
                                                            </span>
                                                        </div>
                                                        <div className="button-container">
                                                            <button
                                                                type="submit"
                                                                color="primary"
                                                                disabled={!isValid || isSubmitting}
                                                            >
                                                                Submit
                                                            </button>
                                                            <button type="reset" onClick={(e) => resetForm()}>
                                                                {" "}
                                                                Reset
                                                            </button>
                                                        </div>
                                                    </form>
                                                );
                                            }}
                                        </Formik>
                                    </Modal>
                                </h1>
                            </div>
                            <div className="col-4">
                                <div className="search"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="lorem-p">
                                <div className="details-form">

                                    <div className="row">
                                        <div className="col-5">
                                            <img className="profilepic" src={profilepic} />
                                        </div>
                                        <div className="col-7">
                                            <div className="row">
                                                <h2 className="details-title">Personal Data</h2>
                                            </div>

                                            <div className="row">

                                                <div className="col-5">
                                                    <div className="details-row">
                                                        {/* User Id  <br /> */}
                                                    </div>
                                                    <div className="details-row">
                                                        User Name <br />
                                                    </div>
                                                    <div className="details-row">
                                                        Email <br />
                                                    </div>
                                                    <div className="details-row">
                                                        Phone Number <br />
                                                    </div>
                                                    <div className="details-row">
                                                        Gender <br />
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <form >

                                                        <div className="details-row">
                                                            {/* {data.userId} */}
                                                            {/* <Input disabled value={data.userId} /> */}
                                                        </div>
                                                        <div className="details-row">
                                                            {/* {data.userName} */}
                                                            <Input disabled value={data.userName} />
                                                        </div>
                                                        <div className="details-row">
                                                            {/* {data.email} */}
                                                            <Input disabled value={data.email} />
                                                        </div>
                                                        <div className="details-row">
                                                            {data.phoneNumber}
                                                            {/* <Input disabled value={data.phoneNumber} /> */}
                                                        </div>
                                                        <div className="details-row">
                                                            {data.gender}
                                                            {/* <Input disabled value={data.phoneNumber} /> */}
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button
                        type="primary"
                        onClick={() => (window.location = "http://localhost:3000/")}
                    >
                        Back Home
                    </Button>
                }
            />
        );
    }
}
export default MyProfile;
