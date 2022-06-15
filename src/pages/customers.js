
import {
    Table,
    Input,
    Button,
    InputNumber,
    Popconfirm,
    Form,
    Typography,
    message,
} from "antd"
import {
    EditTwoTone,
    DeleteTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from '../component/sidebar';

import './Customers.css';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
function Customers() {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [editingKey, setEditingKey] = useState("");
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log("checking");
        fetch("http://localhost/ecommerceapi/api/view.php")
            .then((res) => res.json())
            .then(
                (result) => {
                    setData(result);
                    setRefresh(refresh + 1);
                    console.log(result);
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

    
    const isEditing = (record) => record.customerId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            customerId: "",
            customerName: "",

            email: "",
            phoneNumber: "",
            gender: "",
            address: "",
            profilePicture: "",
            ...record,
        });
        console.log(record.customerId);
        setEditingKey(record.customerId);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const deleteCustomer = (record) => {
        console.log(record);
        console.log(record.customerId);
        console.log(JSON.stringify({ customerId: record.customerId }))
        fetch("http://localhost/ecommerceapi/api/delete-customer.php", {

            body: JSON.stringify({ customerId: record.customerId }),

            method: "DELETE",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message === "customer was deleted.") {
                        console.log(result);
                        message.success(result.message);
                        setRefresh(refresh + 1);
                        console.log(refresh);
                    } else {
                        message.error(result.message);
                    }
                },
                (error) => {
                    console.log(error);
                    message.error(error.message);
                }
            );
    };

    const save = async () => {
        try {
            const row = await form.validateFields();
            // let data = JSON.stringify(row);
            // console.log(data);

            //Inserting form values to db
            fetch("http://localhost/ecommerceapi/api/edit-customer.php", {
                body: JSON.stringify(row),
                headers: { "Authorization": "Bearer" + localStorage.getItem("token") },
                method: "PUT",
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        if (result.message === "Customer was updated.") {
                            console.log(result);
                            message.success(result.message);
                            setRefresh(refresh + 1);
                            setEditingKey("");
                            console.log(refresh);
                            setRefresh(false);
                        } else {
                            message.error(result.message);
                        }
                    },
                    (error) => {
                        console.log(error);
                        message.error("Unable to update customer !!");
                    }
                );

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };



    const styler = {
        paddingLeft: "100px",

        width: "1200px"
    }

    const columns = [
        {

            title: "Id",

            dataIndex: "customerId",

            key: "customerId",

            editable: true,


        },

        {

            title: "Name",

            dataIndex: "customerName",

            key: "customerName",

            editable: true,

        },

        {

            title: "Email",

            dataIndex: "email",

            key: "email",
            editable: true,

        },



        {

            title: "PhoneNumber",

            dataIndex: "phoneNumber",

            key: "phoneNumber",
            editable: true,

        },

        {

            title: "Gender",

            dataIndex: "gender",

            key: "gender",
            editable: true,


        },

        {

            title: "Address",

            dataIndex: "address",

            key: "address",
            editable: true,

        },

        // {

        //     title: "Profile Picture",

        //     dataIndex: "profilePicture",

        //     key: "profilePicture",
        //     editable: true,


        // },

        {
            title: "Operation",
            dataIndex: "customerId",
            width: "10%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            id={record.customerId}
                            onClick={save}
                        >
                            Save
                        </Typography.Link>
                        <Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                Cancel
                            </Popconfirm>
                        </Typography.Link>
                    </span>
                ) : (
                    <span>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            <EditTwoTone />
                        </Typography.Link>
                        <Typography.Link id={record.customerId}>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => deleteCustomer(record)}
                            >
                                <DeleteTwoTone twoToneColor="#eb2f96" />
                            </Popconfirm>
                        </Typography.Link>
                    </span>
                );
            },
        },

    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (

        <div>





            <div className="row">

                <div className="col-2 menu">

                    <Sidebar />

                </div>



                <div className="col-10">

                    <div className="row">

                        <div className="col-6">

                            <h1 className="headerheading ">

                                {/* <RiTeamFill /> */}

                                Customers

                            </h1>
                            <Button
                                type="primary"
                                onClick={() => navigate("/addCustomer")}
                            >
                                Add Customers
                            </Button>

                        </div>



                    </div>



                    <Form form={form} component={false} >
                        <Table style={styler}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            rowKey={(record) => record.customerId}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                defaultPageSize: 5,
                                onChange: cancel,
                            }}
                        />
                    </Form>

                </div>

            </div>

        </div>

    );

}

export default Customers