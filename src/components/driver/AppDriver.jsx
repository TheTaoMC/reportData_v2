import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppDriver() {
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
    zuSetTitle,zuCheckUser
  } = useStore();
  const navigate = useNavigate();
  const [dataID, setDataID] = useState("");
  const [driverID, setDriverID] = useState("");
  const [driverName, setDriverName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);

  const resetState = () => {
    setDataID("");
    setDriverID("");
    setDriverName("");
    setAddress1("");
    setAddress2("");
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(zu_SelectedList.DataID);
    setDriverID(zu_SelectedList.DriverID);
    setDriverName(zu_SelectedList.DriverName);
    setAddress1(zu_SelectedList.Address1);
    setAddress2(zu_SelectedList.Address2);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);


  const columns = [
    {
      field: "DriverID",
      header: "DriverID",
    },
    {
      field: "DriverName",
      header: "DriverName",
    },
    {
      field: "Address1",
      header: "Address1",
    },
    {
      field: "Address2",
      header: "Address2",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
    },
  ];

  const addedit = (
    <div>
      <div>DriverID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={driverID}
          onChange={(e) => {
            setDriverID(e.target.value);
          }}
        />
      </div>
      <div>DriverName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </div>
      <div>Address1</div>
      <div>
        <InputText
          className="w-[100%]"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
      </div>
      <div>Address2</div>
      <div>
        <InputText
          className="w-[100%]"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
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
        "https://theothai.com/ttw_webreport/API/api/driver/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          DataID: driverID === "" ? "" : uuidDataID,
          DriverID: driverID,
          DriverName: driverName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(uuidDataID, driverID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/driver/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          DataID: dataID,
          DriverID: driverID,
          DriverName: driverName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N",
        }),
      };
      zuSetDataID(dataID, driverID);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [driverID, driverName, address1, address2, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/driver/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("พนักงานขับรถ");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/driver/delete.php";
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

export default AppDriver;
