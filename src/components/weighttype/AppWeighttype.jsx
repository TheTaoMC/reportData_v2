import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useStore } from "../../zustand/Store";

function AppWeighttype() {
  const { zu_Data, zu_SelectedList, zu_toggle } = useStore();
  const {
    zuFetch,
    zuSetFetch,
    zuSetAdd,
    zuResetData,
    zuSetDel,
    zuSetFromAddEdit,
    zuSetDataID,
  } = useStore();
  console.log(zu_SelectedList);

  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [weightTypeID, setWeightTypeID] = useState("");
  const [weightTypeName, setWeightTypeName] = useState("");
  const [flagCancel, setFlagCancel] = useState(false);
  //console.log(data);

  const fetchDataBody = {
    method: "GET",
  };
  const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: /* zu_SelectedList.DataID || */ "",
    }),
  };

  const addDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: weightTypeID === "" ? "" : uuidv4(),
      WeightTypeID: weightTypeID,
      WeightTypeName: weightTypeName,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const editDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID,
      WeightTypeID: weightTypeID,
      WeightTypeName: weightTypeName,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setDataID("");
    setWeightTypeID("");
    setWeightTypeName("");
    setFlagCancel(false);
  };
  

  useEffect(() => {
    setDataID("");
    setWeightTypeID("");
    setWeightTypeName("");
    setFlagCancel(false);
  }, [zu_toggle]);

  const setState = () => {
    setDataID(data.DataID);
    setWeightTypeID(data.WeightTypeID);
    setWeightTypeName(data.WeightTypeName);
    setFlagCancel(data.FlagCancel === "Y" ? true : false);
  };

  const upDatedataID = (selectedlist) => {
    //console.log("selectedlist:upDatedataID: ", selectedlist);
    setData(selectedlist);
  };

  const columns = [
    {
      field: "WeightTypeID",
      header: "WeightTypeID",
    },
    {
      field: "WeightTypeName",
      header: "WeightTypeName",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
    },
  ];

  const addedit = (
    <div>
      <div>WeightTypeID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={weightTypeID}
          onChange={(e) => {
            setWeightTypeID(e.target.value);
          }}
        />
      </div>
      <div>WeightTypeName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={weightTypeName}
          onChange={(e) => setWeightTypeName(e.target.value)}
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
    const uuidDataID = uuidv4();
    const urladd =
      "https://theotesteng.000webhostapp.com/API/api/weighttype/create.php";
    const optionadd = {
      method: "POST",
      body: JSON.stringify({
        DataID: weightTypeID === "" ? "" : uuidDataID,
        WeightTypeID: weightTypeID,
        WeightTypeName: weightTypeName,
        FlagCancel: flagCancel ? "Y" : "N",
      }),
    };
    zuSetDataID(uuidDataID, weightTypeID);
    zuSetFromAddEdit(addedit);
    zuSetAdd(urladd, optionadd);
    console.log(urladd, optionadd);
  }, [weightTypeName, weightTypeID, flagCancel]);

  //Load Data รอบแรก
  useEffect(() => {
    zuResetData();
    const urlread =
      "https://theotesteng.000webhostapp.com/API/api/weighttype/read.php";
    const optionread = {
      method: "GET",
    };
    zuSetFetch(urlread, optionread);
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theotesteng.000webhostapp.com/API/api/weighttype/delete.php";
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
      <AppFetch
        sortField={"WeightTypeName"}
        title={"ประเภทชั่ง"}
        fetchDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weighttype/read.php"
        }
        delDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weighttype/delete.php"
        }
        addDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weighttype/create.php"
        }
        editDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weighttype/update.php"
        }
        fetchDataBody={fetchDataBody}
        delDataBody={delDataBody}
        addDataBody={weightTypeID === "" ? null : addDataBody}
        editDataBody={editDataBody}
        columns={columns}
        minWidth={"10rem"}
        selectedlistOut={upDatedataID}
        child={addedit}
        resetState={resetState}
        setState={setState}
        dataID={dataID}
      />
    </div>
  );
}

export default AppWeighttype;
