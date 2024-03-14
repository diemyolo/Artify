import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar';
import { Avatar, Card } from "flowbite-react";
import { Button, Form, Input } from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";

const formItemCol = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};


const EditProfile = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [telephone, setTelephone] = useState("");

    const [customer, setCustomer] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async (event) => {
            try {

                event.preventDefault();
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
    // const handleEditProfile = () => {
    //     const myHeaders = {
    //         "Content-Type": "application/json",
    //     };

    //     const data = {
    //         email: email,
    //         pass: password,
    //     };

    //     axios
    //         .post("http://localhost:8080/api/auth/login", data, { headers: myHeaders })
    //         .then((response) => {
    //             console.log(response.data.payload);
    //             if (response.status === 200) {
    //                 const token = response.data.payload.token;
    //                 localStorage.setItem("token", token);
    //                 setCookie("token", token, 365); // Expires in 365 days
    //                 Swal.fire({
    //                     position: "center",
    //                     icon: "success",
    //                     title: `Welcome`,
    //                     html: "<h3>Login Successfully</h3>",
    //                     showConfirmButton: false,
    //                     timer: 1600
    //                 }).then(() => {
    //                     navigate("/home");
    //                 });
    //             } else {
    //                 throw new Error(response.statusText);
    //             }
    //         })
    //         .catch((error) => {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Email or password is invalid!",
    //                 footer: '<a href="/">Try again!</a>'
    //             });
    //         });
    // };


    return (
        <div className='w-full h-screen bg-gray-100'>
            <NavBar />

            <div className='h-scree w-full flex justify-center p-28 mt-10 gap-10'>
                <Card className="w-[40%]">
                    <div className="flex flex-col items-center">
                        <Avatar rounded size="xl" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {/* {p[0]?.creatorName} */}{customer.userName}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Artist
                        </span>
                    </div>
                </Card>

                <div className="w-1/2 h-full flex flex-col">
                    <h1 className='text-center text-3xl font-semibold mb-10 text-[#2f6a81]'>Edit Profile</h1>
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
                            // onSubmit={handleEditProfile}
                            className="mx-auto"
                        >
                            <Form.Item
                                className="mx-0 px-0 w-full"
                                name="email"
                                label="Email"
                            >
                                <Input
                                    className="w-full px-4"
                                    name="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                className="mx-0 px-0 w-full"
                                name="username"
                                label="Username"
                            >
                                <Input
                                    className="w-full px-4 "
                                    name="username"
                                    placeholder=""
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                className="mx-0 px-0 w-full"
                                name="telephone"
                                label="Telephone"
                            >
                                <Input
                                    className="w-full px-4 "
                                    name="telephone"
                                    placeholder=""
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                            </Form.Item>


                            <div className="w-full flex justify-center gap-4 my-4">
                                <Button
                                    className="border-2 w-[120px] bg-[#2f6a81] text-white my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 "
                                    type="submit"
                                    // onClick={handleEditProfile}
                                    >
                                    Save Changes
                                </Button>
                                <Button
                                    className="border-2 w-[120px] border-[#2f6a81] bg-gray-100 text-[#2f6a81] my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center focus:outline-none hover:bg-[#2f6a81] hover:text-white hover:border-white hover:border-2 mt-3 transition-all duration-300 "
                                    htmlType="reset">Reset
                                </Button>
                            </div>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile