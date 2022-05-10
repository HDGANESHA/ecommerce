import Sidebar from '../component/Sidebar';
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Card } from "antd";
import {
    LeftOutlined
} from "@ant-design/icons";
import './Customers.css';
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
        <Sidebar />
        <div className="alfi">
            <div class="headerbox">
                <h1 style={inp}>Welcome Ganesh</h1>
                <button className="clkbtn" onClick={move}>Sign Out</button>

            </div>
        </div>
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
                    ]}
                >
                    <Input placeholder="Enter customer name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                >
                    <Input.TextArea placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="password"
                >
                    <Input.TextArea placeholder="Enter password" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="phoneNumber"
                >
                    <Input.TextArea placeholder="Enter phoneNumber" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="gender"
                >
                    <Input.TextArea placeholder="Enter gender" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="address"
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
        </Card></>);
}

export default Addcustomer;