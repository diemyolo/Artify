import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home /></div>,
  },
  {
    path: "/register",
    element: <div><Register /></div>,
  },
  {
    path: "/login",
    element: <div><Login /></div>,
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
