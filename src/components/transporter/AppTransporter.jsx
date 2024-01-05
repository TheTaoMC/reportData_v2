import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useSetRecoilState } from "recoil";
import { storeForm } from "../../recoilStore/Store";


function AppTransporter() {
  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [transporterID, setTransporterID] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);

  const fetchDataBody = {
    method: "GET",
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
      TransporterID: transporterID,
      TransporterName: transporterName,
      Address1: address1,
      Address2: address2,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const editDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID,
      TransporterID: transporterID,
      TransporterName: transporterName,
      Address1: address1,
      Address2: address2,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setDataID("");
    setTransporterID("");
    setTransporterName("");
    setAddress1("");
    setAddress2("");
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(data.DataID);
    setTransporterID(data.TransporterID);
    setTransporterName(data.TransporterName);
    setAddress1(data.Address1);
    setAddress2(data.Address2);
    setFlagCancel(data.FlagCancel === "Y" ? true : false);
  };

  const upDatedataID = (selectedlist) => {
    console.log("selectedlist:AppProduct:2 ", selectedlist);

    setData(selectedlist);
  };

  const columns = [
    {
      field: "TransporterID",
      header: "TransporterID",
    },
    {
      field: "TransporterName",
      header: "TransporterName",
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
      <div>TransporterID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={transporterID}
          onChange={(e) => {
            setTransporterID(e.target.value);
          }}
        />
      </div>
      <div>TransporterName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={transporterName}
          onChange={(e) => setTransporterName(e.target.value)}
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
  const setForm = useSetRecoilState(storeForm);
  useEffect(() => {
    setForm(addedit);
  }, []);
  return (
    <div>
      <AppNavber />
      <AppFetch
        sortField={"TransporterName"}
        title={"ผู้ขนส่ง"}
        fetchDataURL={
          "https://theotesteng.000webhostapp.com/API/api/transporter/read.php"
        }
        delDataURL={
          "https://theotesteng.000webhostapp.com/API/api/transporter/delete.php"
        }
        addDataURL={
          "https://theotesteng.000webhostapp.com/API/api/transporter/create.php"
        }
        editDataURL={
          "https://theotesteng.000webhostapp.com/API/api/transporter/update.php"
        }
        fetchDataBody={fetchDataBody}
        delDataBody={delDataBody}
        addDataBody={transporterID === "" ? null : addDataBody}
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

export default AppTransporter;
