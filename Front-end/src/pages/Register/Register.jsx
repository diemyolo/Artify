import React from "react";
import { Checkbox, Form, Input } from "antd";
import video from "../../assets/video_login.mp4";
import { NavLink } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useFormik } from "formik";

const formItemLayout = {
  labelCol: { span: 100 },
  wrapperCol: { span: 100 },
};

export default function Login() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      telephone: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-10 items-center">
            <h3 className="text-3xl text-[#060606] font-semibold mb-4">
              Create New Account
            </h3>
            <p className="text-black/60 mb-2 italic">
              Please fill in the form to continue.
            </p>
          </div>

          <div className="w-full">
            <Form
              {...formItemLayout}
              size="large"
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Form.Item
                className="mx-0 px-0 w-full pt-2.5"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your user name!",
                  },
                  {
                    pattern: /^.{8,}$/,
                    message: "Username must be greater than 7 characters!",
                  },
                ]}
              >
                <Input
                  className="w-full px-4 py-2.5"
                  name="userName"
                  placeholder="Enter your user name"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                className="mx-0 px-0 w-full"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please input valid email!",
                  },
                ]}
              >
                <Input
                  className="w-full px-4 py-2.5"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                className="mx-0 px-0 w-full pt-2.5"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: /^.{8,}$/,
                    message: "Password must be greater than 7 characters!",
                  },
                ]}
              >
                <Input.Password
                  className="w-full px-4 py-2.5"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                className="mx-0 px-0 w-full pt-2.5"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  {
                    pattern: /^.{8,}$/,
                    message: "Password must be greater than 7 characters!",
                  },
                ]}
              >
                <Input.Password
                  className="w-full px-4 py-2.5"
                  placeholder="Enter your confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                className="mx-0 px-0 w-full pt-2.5"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your telephone!",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Telephone number must be exactly 10 digits!",
                  },
                ]}
              >
                <Input
                  className="w-full px-4 py-2.5"
                  placeholder="Enter your telephone number"
                  value={formik.values.telephone}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              

              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full bg-[#060606] text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center focus:outline-none hover:bg-green-600 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-black/70">
              Already have an account?
              <span className="font-semibold underline underline-offset-1 ml-1">
                <NavLink to={"/register"}>
                  <button className="hover:outline-none hover:bg-black underline underline-offset-2 bg-[#f5f5f5] text-red-700 hover:text-white">
                    Sign In
                  </button>
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-6xl text-white font-bold my-4">
            Artwork Sharing Platform
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <video
          className="w-full h-full object-cover"
          src={video}
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
}
