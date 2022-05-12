
// import './Users.css';

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
import Sidebar from '../component/sidebar'




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
function Categories() {

    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [editingKey, setEditingKey] = useState("");
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log("checking");
        fetch("http://localhost/ecommerceapi/api/viewcategories.php")
            .then((res) => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
    }, [refresh]);




    const isEditing = (record) => record.categoryId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            categoryId: "",
            categoryName: "",

            description: "",
            ...record,
        });
        console.log(record.categoryId);
        setEditingKey(record.categoryId);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const deletecategory = (record) => {
        console.log(record);
        console.log(record.categoryId);
        console.log(JSON.stringify({ categoryId: record.categoryId }))
        fetch("http://localhost/ecommerceapi/api/delete-category.php", {

            body: JSON.stringify({ userId: record.categoryId }),

            method: "DELETE",
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.message === "category was deleted.") {
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
            fetch("http://localhost/ecommerceapi/api/edit-category.php", {
                body: JSON.stringify(row),
                method: "PUT",
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        if (result.message === "user was updated.") {
                            console.log(result);
                            message.success(result.message);
                            setRefresh(refresh + 1);
                            setEditingKey("");
                            console.log(refresh);
                        } else {
                            message.error(result.message);
                        }
                    },
                    (error) => {
                        console.log(error);
                        message.error("Unable to update user !!");
                    }
                );

        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };



    const styler = {
        paddingLeft: "100px",

        width: "900px"
    }

    const columns = [
        {

            title: "Id",

            dataIndex: "categoryId",

            key: "categoryId",

            editable: true,


        },

        {

            title: "category",

            dataIndex: "categoryName",

            key: "categoryName",

            editable: true,

        },

        {

            title: "Description",

            dataIndex: "description",

            key: "description",
            editable: true,

        },



        {
            title: "Operation",
            dataIndex: "categoryId",
            width: "10%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            id={record.categoryId}
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
                        <Typography.Link id={record.categoryId}>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => deletecategory(record)}
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
    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        localStorage.clear();
        navigate('../../');
    }

    return (

        <div>





            <div className="row">

                <div className="col-2 menu">

                    <Sidebar />

                </div>
                <div className="alfi">
                    <div className="headerbox">
                        <h1 style={inp}>Welcome Ganesh</h1>
                        <button className="clkbtn" onClick={move}>Sign Out</button>

                    </div>
                </div>



                <div className="col-10">

                    <div className="row">

                        <div className="col-6">
                            <br />
                            <h1 className="headerheading ">

                                {/* <RiTeamFill /> */}

                                Category

                            </h1>

                            <Button
                                type="primary"
                                onClick={() => navigate("../pages/Addcategory")}
                            >
                                Add Category
                            </Button>
                            <br />

                        </div>



                    </div>

                    <br />
                    <Form form={form} component={false} >
                        <Table style={styler}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            rowKey={(record) => record.categoryId}
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

export default Categories;
