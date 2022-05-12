import Sidebar from '../component/sidebar';

import { useNavigate } from "react-router-dom";
import React from "react";
import { Form, Input, message, Button, Space, Card } from "antd";
import {
    LeftOutlined
} from "@ant-design/icons";
import './Customers.css';
function Addcategory() {
    let navigate = useNavigate();
    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        navigate('../../');
    }
    const mov = () => {
        navigate('../pages/categories');
    }
    const [form] = Form.useForm();

    const onFinish = (values) => {
        fetch("http://localhost/ecommerceapi/api/create-category.php", { body: JSON.stringify(values), method: "POST" })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message == "cateegory was created.") {
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
        <Card title=" Add Category" style={{ width: "50%", margin: "auto", gap: 10 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Category Name"
                    name="categoryName"
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
                    <Input placeholder="Enter category name" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="description"
                >
                    <Input.TextArea placeholder="Enter description" />
                </Form.Item>
                
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

export default Addcategory;