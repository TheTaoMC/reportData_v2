import React, { useRef, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";

function AppLogin() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      const authenticatedUser = { username: username };
      Cookies.set("username", JSON.stringify(authenticatedUser), {
        expires: 100 / 1000,
      });
      return navigate("/main");
    } else {
      //alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        life: 3000,
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
      // ทำสิ่งที่คุณต้องการทำเมื่อกดปุ่ม Enter
      console.log("Enter key pressed");
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <AppNavber title={"login"} />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="sm:w-[30%] rounded-lg border-4 border-sky-500/50">
          <div className="p-2 text-xl antialiased font-semibold">
            เข้าสู่ระบบ
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="username">ชื่อผู้ใช้</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="username">password</label>
            <Password
              id="password"
              aria-describedby="password-help"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              feedback={false}
              //tabIndex={1}
              toggleMask
              pt={{
                input: { className: "w-full" },
                showIcon: { className: "flex" },
                hideIcon: { className: "flex" },
              }}
            />
          </div>
          <div className="p-2">
            <Button
              className="w-full"
              label="เข้าสู่ระบบ"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLogin;
