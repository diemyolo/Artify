import React, { useState } from "react";
import { Checkbox, Form, Input } from "antd";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import login from "../../assets/login.jpg"

const formItemCol = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default function Login() {
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //   }
  // });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const raw = JSON.stringify({
      email: email,
      pass: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/auth/login", requestOptions)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result.payload.token);
        alert("Success");
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        alert("Email, password invalid");
      });
  };

  return (
    <div className="bg-[#f5f5f5] w-full h-screen flex items-center">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col z-10">
          <h1 className="text-7xl text-white font-bold my-5">
            Artwork Sharing Platform
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <div className="relative ml-8 mt-8 mb-8 w-100 h-full">
          <img src={login} className="w-full h-full rounded-3xl" style={{ width: "1068px" }}/>
          <div className="absolute rounded-3xl top-0 left-0 w-full h-full bg-black opacity-50"></div>
        </div>
      </div>

      <div className="w-1/2 h-full flex flex-col p-20 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-10 items-center">
            <h3 className="text-5xl text-[#060606] font-bold mb-4">
              Login
            </h3>
            <p className="text-black/60 mb-2 italic">
              Welcome Back! Please enter your details.
            </p>
          </div>

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
              // onFinish={formik.handleSubmit}
              onSubmit={handleLogin}
            >
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
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                className="mx-0 px-0 w-full pt-2.5"
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your password!",
                //   },
                //   {
                //     pattern: /^.{8,}$/,
                //     message: "Password must be greater than 7 characters!",
                //   },
                // ]}
              >
                <Input.Password
                  className="w-full px-4 py-2.5"
                  placeholder="Enter your password"
                  // value={formik.values.password}
                  // onChange={formik.handleChange}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                {...formItemCol}
              >
                <div
                  className="flex items-center"
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Checkbox>Remember me</Checkbox>
                  <p className="font-bold cursor-pointer hover:text-green-600">Forgot Password</p>
                </div>
              </Form.Item>

              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full bg-[#060606] text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center focus:outline-none hover:bg-green-600 mt-3"
                  type="submit"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              </div>
            </Form>

            <div className="w-full py-2 flex items-center justify-center relative">
              <div className="w-full h-[1px] bg-black/25"></div>
              <p className="absolute  p-2 text-black/60 bg-[#f5f5f5]">or</p>
            </div>

            <div className="w-full flex items-center justify-center my-4">
              <GoogleButton
                type="light"
                style={{
                  width: "100%",
                  borderRadius: "0.375rem",
                  fontSize: ".9em"
                }}
                className="my-2"
                onClick={() => alert("Google button clicked")}
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-black/70">
              Don't have an account?
              <span className="font-semibold underline underline-offset-1 ml-1">
                <NavLink to={"/register"}>
                  <button className="hover:outline-none hover:bg-black underline underline-offset-2 bg-[#f5f5f5] text-red-700 hover:text-white">Sign Up</button>
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
