import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppUser() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
  } = useStore();
  const {
    zuFetch,
    zuSetFetch,
    zuSetAdd,
    zuResetData,
    zuSetDel,
    zuSetFromAddEdit,
    zuSetDataID,
    zuSetEdit,
    zuSetColumns,
    zuSetTitle,
  } = useStore();

  const [dataID, setDataID] = useState("");
  const [logInName, setLogInName] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [permission, setPermission] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);

  const resetState = () => {
    setDataID("");
    setLogInName("");
    setLogInPassword("");
    setFullName("");
    setPermission("");
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setLogInName(zu_SelectedList.DriverID);
    setLogInPassword(zu_SelectedList.DriverName);
    setFullName(zu_SelectedList.Address1);
    setPermission(zu_SelectedList.Address2);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

  const columns = [
    {
      field: "LogInName",
      header: "LogInName",
    },
    {
      field: "FullName",
      header: "FullName",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
    },
  ];

  const addedit = (
    <div>
      <div>logInName</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={logInName}
          onChange={(e) => {
            setLogInName(e.target.value);
          }}
        />
      </div>
      <div>logInPassword</div>
      <div>
        <InputText
          className="w-[100%]"
          value={logInPassword}
          onChange={(e) => setLogInPassword(e.target.value)}
        />
      </div>
      <div>fullName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-2 items-center">
            <div>สถานะ</div>
            <Checkbox
              onChange={(e) => setFlagCancel(e.checked)}
              checked={flagCancel}
            ></Checkbox>
            <label htmlFor="ingredient1" className="">
              ยกเลิก
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  //setFromAddEdit //AddData
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      /* if (zu_SelectedList.length === 0) { */
      console.log("Add...");
      const uuidDataID = uuidv4();
      const urladd =
        "https://theothai.com/ttw_webreport/API/api/userlogin/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: logInName === "" ? "" : uuidDataID,
          LogInName: logInName,
          LogInPassword: logInPassword,
          FullName: fullName,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, logInName);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/userlogin/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          LogInName: logInName,
          LogInPassword: logInPassword,
          FullName: fullName,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, logInName);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [logInName, logInPassword, fullName, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/userlogin/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("ผู้ใช้งาน");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/userlogin/delete.php";
    const optiondel = {
      method: "POST",
      body: JSON.stringify({
        DataID: zu_SelectedList.DataID ? zu_SelectedList.DataID : "",
      }),
    };
    zuSetDel(urldel, optiondel);
  }, [zu_SelectedList]);
  return (
    <div>
      <AppNavber />
      <AppFetch sortField={"DriverName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppUser;
