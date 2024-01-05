import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AppNavber from "../navbar/AppNavber";
import AppDashboard from "./../dashboard/AppDashboard";
function AppMain() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get("username");
    if (!storedUser) {
      //alert("หมดอายุการใช้งาน");
      navigate("/");
      return;
    }
  }, []);

  return (
    <>
      <AppNavber />
      <AppDashboard />
    </>
  );
}

export default AppMain;
