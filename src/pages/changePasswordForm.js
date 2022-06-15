import React, { useState } from "react";
import { Form, Input } from "formik-antd";
import { Formik, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Modal, message, Select } from "antd";
import { ValidatePassword } from "./validatePassword";
import { useNavigate } from "react-router-dom";
import { yupToFormErrors } from "./yupToFormErrors";
// import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import "./changePassword.css"
import { Button } from "antd";

const passwordSchema = Yup.object().shape({
    confirmPassword: Yup.string("Enter your password")
        .min(6, "minLength_6")
        .max(15, "maxLength15")
        .required("Password is required")
        .matches("[0-9]+", "contain_number")
        .matches(/[A-Z].*[A-Z]/, "contain_2_uperCase")
        .matches(/[a-z].*[a-z]/, "contain_2_lowerCase")
        .oneOf(
            [Yup.ref("password"), null],
            "Passwords must match, should be same as new password"
        ),
    password: Yup.string("Enter your password")
        .min(6, "minLength_6")
        .max(15, "maxLength15")
        .required("Password is required")
        .matches("[0-9]+", "contain_number")
        .matches(/[A-Z].*[A-Z]/, "contain_2_upperCase")
        .matches(/[a-z].*[a-z]/, "contain_2_lowerCase")
        .test(
            "atMost2SpecialCharacters",
            "Atmost 2 special characters are allowed!",
            function (value) {
                return new Promise((resolve) => {
                    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
                    const allFoundCharacters = value.match(specialChars);
                    if (allFoundCharacters && allFoundCharacters.length > 2) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            }
        ),
});
export const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  
    let navigate = useNavigate();

    const profpag = () => {
        navigate('../../pages/profile');
    }

    
    // Enable and Disable the submit button

    const [formData, setFormData] = useState(null);

    const validateYupSchemaMultiErrors = async (values, schema) => {
        if (values && values.currentPassword) {
            setFormData({
                currentPassword: values.currentPassword,
                password: values.password,
                confirmPassword: values.confirmPassword,
                userId: localStorage.getItem("userId")
            });
        }
        try {
            await validateYupSchema(values, schema);
            return {};
        } catch (e) {
           
            return yupToFormErrors(e, { showMultipleFieldErrors: true });
        }
    };
   
   
    return (
        <div>
            <Modal
                closable="true"
                title="Change Password"
                maskClosable="true"
                onCancel={onCancel}
                visible={visible}  >
                <div >
                    <Formik

                        initialValues={{
                            currentPassword: "",
                            password: "",
                            confirmPassword: "",
                        }}

                        validate={(values) =>
                            validateYupSchemaMultiErrors(values, passwordSchema)
                        }
                        key="PrimaryDetails"
                    >

                        {(props) => (
                            <Form layout="vertical" name="changePassword">
                                <Form.Item name="currentPassword" label="Current Password">
                                    <Input.Password
                                        name="currentPassword"
                                        placeholder="Enter your current password"
                                    />
                                </Form.Item>
                                <Form.Item name="password" label="New Password">
                                    <Input.Password
                                        name="password"
                                        placeholder="Enter your new password"
                                    />
                                </Form.Item>
                                {/* Icon start here */}
                                <div >
                                    <label
                                        htmlFor="password"
                                        className={ValidatePassword(props, "contain_2_upperCase")}
                                    >{ValidatePassword(props, "contain_2_upperCase") === "Inactive" ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                        Should contain 2 upper case
                                    </label><br />
                                    <label
                                        htmlFor="password"
                                        className={ValidatePassword(props, "contain_2_lowerCase")}
                                    >{ValidatePassword(props, "contain_2_lowerCase") === "Inactive" ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                        Should contain 2 lower case
                                    </label><br />
                                    <label
                                        htmlFor="password"
                                        className={ValidatePassword(props, "minLength_6")}
                                    >{ValidatePassword(props, "minLength_6") === "Inactive" ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                        password should have minimum 6 characters
                                    </label><br />
                                    <label
                                        htmlFor="password"
                                        className={ValidatePassword(props, "maxLength15")}
                                    >{ValidatePassword(props, "maxLength15") === "Inactive" ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                        password should have maximum 15 characters
                                    </label><br />
                                    <label
                                        htmlFor="password"
                                        className={ValidatePassword(props, "atMost2SpecialCharacters")}
                                    >{ValidatePassword(props, "atMost2SpecialCharacters") === "Inactive" ? <CheckCircleFilled /> : <CloseCircleFilled />}
                                        password should atmost 2 special characters
                                    </label>
                                </div>
                                {/* Icon End Here */}

                                <br />
                                <Form.Item name="confirmPassword" label="Confirm Password">
                                    <Input.Password
                                        name="confirmPassword"
                                        placeholder="Re-enter your new password"
                                    />
                                </Form.Item>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};
