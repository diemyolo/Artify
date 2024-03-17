import { Avatar, Button, Form, Input } from "antd";
import axios from "axios";
import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import NavBar from "../../components/NavBar";
import FooterPart from "../../components/FooterPart";

const formItemCol = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

const EditProfile = () => {
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState({});
    const [emailAddress, setEmailAddress] = useState("");
    const [userName, setUserName] = useState("");
    const [telephone, setTelephone] = useState("");

    const [files, setFiles] = useState();

    console.log(files);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get(
                    "http://localhost:8080/api/auth/user/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCustomer(customerResponse.data.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleEditProfile = () => {
        const myHeaders = {
            "Content-Type": "multipart/form-data",
        };
        const updatedProfileDTO = {
            userName: userName,
            telephone: telephone,
        };
        const formData = new FormData();
        formData.append("image", files[0]);
        formData.append(
            "user",
            new Blob([JSON.stringify(updatedProfileDTO)], { type: "application/json" })
        );
        console.log(formData);
        axios
            .put("http://localhost:8080/api/auth/user/profile", formData, {
                headers: { Authorization: `Bearer ${token}`, myHeaders },
            })
            .then((response) => {
                console.log(response.data.payload);
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Welcome`,
                        html: "<h3>Updated Successfully</h3>",
                        showConfirmButton: false,
                        timer: 1600,
                    });
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
    };
    const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFiles([selectedFile]);
        }
    };
    console.log(userName);
    console.log(telephone);
    return (
        <div className="w-full h-full bg-gray-100">
            {/* <Spin spinning={!isLoading} fullscreen /> */}
            <NavBar />
            {/* {isLoading && ( */}
            <div className="h-screen w-full flex justify-center p-28 mt-10 gap-10">
                <div className="relative w-1/2 h-[40%] bg-[#2f6a81]">
                    <div className="absolute flex flex-col items-center justify-center w-full top-1/3">
                        <Card className="w-[50%] h-[300px]">
                            <div className="flex flex-col items-center">
                                <div className="relative rounded-full shadow-2xl">
                                    <Avatar
                                        rounded
                                        size="large"
                                        style={{ width: '225px', height: '225px' }}
                                        src={
                                            files != null
                                                ? URL.createObjectURL(files[0])
                                                : customer.imagePath
                                        }
                                    />
                                    <label
                                        htmlFor="upload"
                                        className="absolute right-0 bottom-1 bg-[#2f6a81] rounded-full p-1.5 cursor-pointer"
                                    >
                                        <MdOutlineModeEdit size={20} color="white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="upload"
                                        // accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                                <h5 className="mt-3 text-xl font-medium text-gray-900 dark:text-white">
                                    {customer.userName}
                                </h5>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="w-1/2 h-full flex flex-col">
                    <h1 className="text-center text-3xl font-semibold mb-3 text-[#2f6a81]">
                        Edit Profile
                    </h1>
                    <p className="text-center mb-10 text-[#2f6a81]">
                        Update your profile information
                    </p>
                    <div className="w-full">
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
                            onSubmit={handleEditProfile}
                            className="mx-auto"
                        >
                            <Form.Item
                                className="m-2 px-0 w-full"
                                name="emailAddress"
                                label="Email"
                            >
                                <Input
                                    className="w-full px-4 rounded-lg"
                                    name="emailAddress"
                                    placeholder={customer.emailAddress}
                                    value={customer.emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                className="m-2 px-0 w-full"
                                name="userName"
                                label="Username"
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
                                    className="w-full px-4 rounded-lg"
                                    name="username"
                                    placeholder={customer.userName}
                                    value={customer.userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                className="m-2 px-0 w-full"
                                name="telephone"
                                label="Telephone"
                                rules={[
                                    {
                                        pattern: /^0\d{9}$/,
                                        message:
                                            "Please input a valid phone number that starts with 0 and contains 10 digits!",
                                    },
                                ]}
                            >
                                <Input
                                    className="w-full px-4 rounded-lg"
                                    name="telephone"
                                    placeholder={customer.telephone}
                                    value={customer.telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                            </Form.Item>
                            <div className="w-full flex justify-center gap-4 my-4">
                                <Button
                                    className="rounded-full border-2 w-[140px] bg-[#2f6a81] text-white my-2  px-4 py-2 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 "
                                    type="submit"
                                    onClick={handleEditProfile}
                                >
                                    Save Changes
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
            </div>
            {/* )} */}

            <FooterPart />
        </div>
    );
};

export default EditProfile;
