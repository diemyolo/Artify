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
import SinglePost from "./pages/SinglePost/SinglePost";
import ArtistProfile from "./pages/Profile/ArtistProfile";
import AddArts from "./pages/Post/AddArts";
import Gallery from "./pages/Gallery/Gallery";
import RequestHistory from "./pages/Request/RequestHistory";
import EditProfile from "./pages/Profile/EditProfile";
import CheckOCB from "./pages/EWallet/CheckOCB";
import ViewPreOrders from "./pages/ReturnOrderRequest/ViewPreOrders";
import ArtistList from "./pages/Profile/ArtistList";
import ProcessPreOrder from "./pages/Request/ProcessPreOrder";

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
  },
  {
    path: "/artistProfile",
    element: <div><ArtistProfile /></div>,
  },
  {
    path: "/addArts",
    element: <div><AddArts /></div>,
  },
  {
    path: "/gallery",
    element: <div><Gallery /></div>,
  },
  {
    path: "/requestHistory",
    element: <div><RequestHistory /></div>,
  },
  {
    path: "/editProfile",
    element: <div><EditProfile /></div>,
  },
  {
    path: "/checkOCB",
    element: <div><CheckOCB /></div>,
  },
  {
    path: "/viewPreordersByCreator",
    element: <div><ViewPreOrders /></div>,
  },
  {
    path: "/artistList",
    element: <div><ArtistList /></div>,
  },
  {
    path: "/processRequest",
    element: <div><ProcessPreOrder /></div>,
  }
]);

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
