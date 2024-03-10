import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home"
import ViewEwallet from "./pages/EWallet/ViewEwallet";
import ReturnWallet from "./pages/EWallet/ReturnWallet";
import AddMoneyInput from "./pages/EWallet/AddMoneyInput";
import AddSuccess from "./pages/EWallet/AddSuccess";
import AddPost from "./pages/Post/AddPost";
import SinglePost from "./pages/Post/SinglePost";

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
  {
    path: "/viewEwallet",
    element: <div><ViewEwallet /></div>,
  },
  {
    path: "/returnEwallet",
    element: <div><ReturnWallet /></div>,
  },
  {
    path: "/addInputMoney",
    element: <div><AddMoneyInput /></div>,
  },
  {
    path: "/addSuccess",
    element: <div><AddSuccess /></div>,
  },
  {
    path: "/addPost",
    element: <div><AddPost /></div>,
  }
]);

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
};

export default App
