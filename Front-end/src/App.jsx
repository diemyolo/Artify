import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home"
import SinglePost from "./pages/SinglePost/SinglePost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Login /></div>,
  },
  {
    path: "/register",
    element: <div><Register /></div>,
  },
  {
    path: "/home",
    element: <div><Home /></div>,
  },
  {
    path: "/singlePost",
    element: <div><SinglePost /></div>,
  },
]);

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
};

export default App
