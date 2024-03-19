import {
    CloseOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Spin, Table, Tag } from "antd";
import axios from "axios";
import { Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formItemCol = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const { Option } = Select;

const Account = () => {
    const token = localStorage.getItem("token");
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [roleName, setRoleName] = useState("");
    const [files, setFiles] = useState();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/auth/admin/user/list`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUserList(response.data.payload);
            setIsLoading(true);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData on component mount
    }, [token]);

    const handleAddUser = () => {
        const myHeaders = {
            "Content-Type": "multipart/form-data",
        };
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Confirm password does not match!",
            });
            return;
        } else {
            const addedUser = {
                userName: userName,
                emailAddress: emailAddress,
                telephone: telephone,
                password: password,
                status: status,
                roleName: roleName
            };
            const formData = new FormData();
            if (files != null && files.length > 0) {
                formData.append("image", files[0]);
            }
            console.log(files);
            formData.append(
                "user",
                new Blob([JSON.stringify(addedUser)], { type: "application/json" })
            );
            axios
                .post("http://localhost:8080/api/auth/admin/user/add", formData, {
                    headers: { Authorization: `Bearer ${token}`, myHeaders },
                })
                .then((response) => {
                    if (response) setIsLoading(true);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Done`,
                            html: "<h3>Add Successfully</h3>",
                            showConfirmButton: false,
                            timer: 1600,
                        });
                        setOpenModal(false);
                        fetchData();
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="/">Try again!</a>',
                    });
                });
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Tag color={text === 'ACTIVE' ? 'green' : 'red'}>
                    {text}
                </Tag>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    const handleModalOpen = () => {
        setOpenModal(true);
    };
    const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFiles([selectedFile]);
        }
    };

    return (
        <>
            <div className='h-full bg-gray-100'>

                <Spin spinning={!isLoading} fullscreen />
                <h1 className='text-center font-semibold text-3xl px-5'>Account Management</h1>
                <div className="cursor-pointer w-[180px] flex justify-center gap-2 text-white bg-[#2f6a81] transition-all duration-300 rounded-lg my-1 mt-10">
                    <PlusOutlined className="mr-1" />
                    <button type="submit" onClick={handleModalOpen}>Add Account</button>
                </div>
                <Table dataSource={userList} columns={columns} rowKey="userId" className='p-5' />

            </div>
            <Modal
                show={openModal}
                title="Add Account"
                className="mt-10 p-72 zIndex-10"
                size={1}
                onCancel={() => setOpenModal(false)}
                footer={null}
            >
                <div className="flex">
                    <div className="w-1/2 pr-5">
                        <h1 className="text-center font-semibold text-2xl mt-14">Add account</h1>
                        <p className="text-center mt-3">To add an account, please fill in the fields below.</p>
                        <div className="pt-14" style={{ overflow: 'hidden' }}>
                            <Button
                                className="absolute top-3 right-3"
                                type="text"
                                onClick={() => setOpenModal(false)}
                                icon={<CloseOutlined />}
                            />
                            <Form
                                {...formItemCol}
                                size="large"
                                style={{
                                    maxWidth: 600,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="userName"
                                    label="User Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your username!",
                                        },
                                        {
                                            pattern: /^[A-Za-z\s]{4,}$/,
                                            message:
                                                "Please input a valid username with more than 3 letters!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="w-full px-4 py-2.5"
                                        placeholder="Enter User Name"
                                        onChange={(e) => setUserName(e.target.value)}
                                        name="userName"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="emailAddress"
                                    label="emailAddress"
                                >
                                    <Input
                                        className="w-full px-4 py-2.5"
                                        placeholder="Enter Email Address"
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        name="emailAddress"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="password"
                                    label="Password"
                                >
                                    <Input.Password
                                        className="w-full px-4 py-2.5"
                                        placeholder="Enter Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                >
                                    <Input.Password
                                        className="w-full px-4 py-2.5"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        name="confirmPassword"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="telephone"
                                    label="Telephone"
                                >
                                    <Input
                                        className="w-full px-4 py-2.5"
                                        placeholder="Enter Telephone"
                                        onChange={(e) => setTelephone(e.target.value)}
                                        name="telephone"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="status"
                                    label="Status"
                                >
                                    <Select
                                        placeholder="Select status"
                                        onChange={(value) => setStatus(value)}
                                    >
                                        <Option value="ACTIVE">Active</Option>
                                        <Option value="INACTIVE">Inactive</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mx-0 px-0 w-full pt-2.5"
                                    name="roleName"
                                    label="Role"
                                >
                                    <Select
                                        placeholder="Select role"
                                        onChange={(value) => setRoleName(value)}
                                    >
                                        <Option value="Creator">Creator</Option>
                                        <Option value="Customer">Customer</Option>
                                    </Select>
                                </Form.Item>
                                <div className="w-full flex justify-center gap-4 my-4">
                                    <Button
                                        className="rounded-full border-2 w-[140px] bg-[#2f6a81] text-white my-2  px-4 py-2 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 "
                                        type="submit" onClick={handleAddUser}
                                    >
                                        Add User
                                    </Button>
                                    <Button
                                        className="rounded-full border-2 w-[140px] border-[#2f6a81] bg-gray-100 text-[#2f6a81] my-2  px-4  py-2 text-center flex items-center justify-center focus:outline-none hover:bg-[#2f6a81] hover:text-white hover:border-white hover:border-2 mt-3 transition-all duration-300"
                                        htmlType="reset"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="w-1/2 pl-5">
                        <Card className="h-full">
                            <div className="flex flex-col items-center">
                                <div className="relative rounded-full shadow-2xl">
                                    <Avatar
                                        size="large"
                                        style={{ width: '225px', height: '225px' }}
                                        src={
                                            files != null
                                                ? URL.createObjectURL(files[0])
                                                : null
                                        }
                                    />
                                    <label
                                        htmlFor="upload"
                                        className="absolute right-0 bottom-1 bg-[#2f6a81] rounded-full p-1.5 cursor-pointer"
                                    >
                                        <EditOutlined size={20} color="white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="upload"
                                        style={{ display: "none" }}
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Account;