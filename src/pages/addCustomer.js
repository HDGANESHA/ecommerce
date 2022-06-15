import Sidebar from '../component/sidebar';
import Dashboard from "./dashboard";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Select, Card } from "antd";
// const { Option } = Select;

import {
    LeftOutlined
} from "@ant-design/icons";
import './Customers.css';
import SidebarHead from '../component/Sidebarhead/sidebarHead';
function Addcustomer() {
    let navigate = useNavigate();
    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        navigate('../../');
    }
    const mov = () => {
        navigate('../pages/dashboard');
    }
    const [form] = Form.useForm();

    const onFinish = (values) => {
        fetch("http://localhost/ecommerceapi/api/create-customer.php", { body: JSON.stringify(values), method: "POST" })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message == "Customer was created.") {
                        console.log(result);
                        message.success(result.message);
                        form.resetFields();
                    }
                    else {
                        message.error(result.message);
                    }
                },
                (error) => {
                    console.log(error);
                    message.error(error.message);
                },
            );
    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };


    const onReset = () => {
        form.resetFields();
    };
    return (<>
        <SidebarHead/>
        
       <div className='maincon'>
        <LeftOutlined style={{ color: "purple", fontSize: 30 }} onClick={() => navigate("/admin/categories")} />
        <Card title=" Add Customer" style={{ width: "50%", margin: "auto", gap: 10 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Customer Name"
                    name="customerName"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: "string",
                            min: 3,
                        },
                        {
                            type: "string",
                            max: 15,
                            message: "Too long !",
                        },

                    ]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                            message: "Email cannot be empty",
                        },
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            max: 50,
                            message: "Too long!",
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="password"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: "string",
                            min: 6,
                            message: "minimum 6 length password !",
                        },
                        {
                            type: "string",
                            max: 15,
                            message: "Too long !",
                        },

                    ]}
                >
                    <Input.TextArea placeholder="Enter password" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "Phone Number cannot be empty",
                        },
                        {
                            max: 10,
                            message: "Cannot be more than 10 digits",
                        },
                        {
                            min: 10,
                            message: "Cannot be less than 10 digits",
                        },
                    ]}

                >
                    <Input.TextArea placeholder="Enter phoneNumber" />
                </Form.Item>

                {/* <Form.Item name="gender" label="Gender">
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item> */}
                <Form.Item
                    name="address"
                    label="address"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: "string",
                            min: 3,
                        }]}
                >
                    <Input.TextArea placeholder="address" />
                </Form.Item>
                {/* <Form.Item
                    name="profilePicture"
                    label="profilePicture"
                >
                    <Input.TextArea placeholder="profilePicture" />
                </Form.Item> */}
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="button" onClick={mov}>
                            Back
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            </Card>
        </div>
    </>);
}

export default Addcustomer;