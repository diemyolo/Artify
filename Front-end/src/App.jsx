import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Login /></div>,
  },
  {
    path: "/register",
    element: <div><Register /></div>,
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
