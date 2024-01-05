import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { storeForm, storeOption, storeURL } from "../../recoilStore/Store";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useStore } from "../../zustand/Store";

function AppCustomer() {
  const { zu_Data, zuFetch, zuResetData } = useStore();

  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);

  const setForm = useSetRecoilState(storeForm);
  const setUrl = useSetRecoilState(storeURL);
  const setOption = useSetRecoilState(storeOption);

  const fetchDataBody = {
    method: "GET",
    //mode: "cors",
    headers: {
      //"Api-Key": "857F7237C03246028748D51C97D4BADE", // กำหนด API key ของคุณ
      //ABC: "857F7237C03246028748D51C97D4BADE",
      //X_api_key: "857F7237C03246028748D51C97D4BADE",
      //Authorization: "Bearer 857F7237C03246028748D51C97D4BAD",
      //'Origin': 'http://localhost:5173/',
    },
  };
  const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: data.DataID || "",
    }),
  };

  const addDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: uuidv4(),
      CustomerID: customerID,
      CustomerName: customerName,
      Address1: address1,
      Address2: address2,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const editDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID,
      CustomerID: customerID,
      CustomerName: customerName,
      Address1: address1,
      Address2: address2,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setDataID("");
    setCustomerID("");
    setCustomerName("");
    setAddress1("");
    setAddress2("");
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(data.DataID);
    setCustomerID(data.CustomerID);
    setCustomerName(data.CustomerName);
    setAddress1(data.Address1);
    setAddress2(data.Address2);
    setFlagCancel(data.FlagCancel === "Y" ? true : false);
  };

  const upDatedataID = (selectedlist) => {
    console.log("selectedlist: ", selectedlist);
    setData(selectedlist);
  };

  const columns = [
    {
      field: "CustomerID",
      header: "CustomerID",
    },
    {
      field: "CustomerName",
      header: "CustomerName",
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
      <div>CustomerID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={customerID}
          onChange={(e) => {
            setCustomerID(e.target.value);
          }}
        />
      </div>
      <div>CustomerName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
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

  useEffect(() => {
    zuResetData();
    const url =
      "https://theotesteng.000webhostapp.com/API/api/customer/read.php";
    const option = {
      method: "GET",
    };
    zuFetch(url, option);
  }, []);
  return (
    <div>
      <AppNavber />
      <AppFetch
        sortField={"CustomerName"}
        title={"ลูกค้า"}
        fetchDataURL={
          "https://theotesteng.000webhostapp.com/API/api/customer/read.php"
        }
        delDataURL={
          "https://theotesteng.000webhostapp.com/API/api/customer/delete.php"
        }
        addDataURL={
          "https://theotesteng.000webhostapp.com/API/api/customer/create.php"
        }
        editDataURL={
          "https://theotesteng.000webhostapp.com/API/api/customer/update.php"
        }
        fetchDataBody={fetchDataBody}
        delDataBody={delDataBody}
        addDataBody={customerID === "" ? null : addDataBody}
        editDataBody={editDataBody}
        columns={columns}
        minWidth={"10rem"}
        selectedlistOut={upDatedataID}
        child={addedit}
        resetState={resetState}
        setState={setState}
      />
    </div>
  );
}

export default AppCustomer;
