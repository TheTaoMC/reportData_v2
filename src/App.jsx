import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import AppWeight from "./components/weight/AppWeight.jsx";
import AppProduct from "./components/product/AppProduct";
import AppCustomer from "./components/customer/AppCustomer.jsx";
import AppWeighttype from "./components/weighttype/AppWeighttype.jsx";
import AppDriver from "./components/driver/AppDriver.jsx";
import AppTransporter from "./components/transporter/AppTransporter.jsx";
import AppLogin from "./components/login/AppLogin.jsx";
import AppWeightreport from "./components/weightreport/AppWeightreport.jsx";
import AppMain from "./components/main/AppMain.jsx";
import AppUser from "./components/user/AppUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLogin />,
  },
  {
    path: "main",
    element: <AppMain />,
  },
  {
    path: "weight",
    element: <AppWeight />,
  },
  {
    path: "weightreport",
    element: <AppWeightreport />,
  },
  {
    path: "product",
    element: <AppProduct />,
  },
  {
    path: "customer",
    element: <AppCustomer />,
  },
  {
    path: "weighttype",
    element: <AppWeighttype />,
  },
  {
    path: "driver",
    element: <AppDriver />,
  },
  {
    path: "transporter",
    element: <AppTransporter />,
  },
  {
    path: "user",
    element: <AppUser />,
  },
  {
    path: "login",
    element: <AppLogin />,
  },
]);
function App() {
  return (
    <>
      <BrowserRouter basename={"/"}>
        <RouterProvider router={router} />
      </BrowserRouter>
    </>
  );
}

export default App;
