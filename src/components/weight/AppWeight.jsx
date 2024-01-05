import React, { useEffect, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";
import { useSetRecoilState } from "recoil";
import { storeForm } from "../../recoilStore/Store";

function AppWeight() {
  const [dataID, setDataID] = useState("");
  const fetchDataBody = {
    method: "POST",
    body: JSON.stringify({
      WeightDateOutFilter: true,
      WeightDateOutFrom: "2022-01-01",
      WeightDateOutTo: "2023-12-31",
    }),
  };
  const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID.DataID,
    }),
  };

  const upDatedataID = (selectedlist) => {
    setDataID(selectedlist);
  };

  const columns = [
    {
      field: "DataID",
      header: "DataID",
    },
    {
      field: "WeightTimeIn",
      header: "WeightTimeIn",
    },
    {
      field: "WeightTimeOut",
      header: "WeightTimeOut",
    },
    {
      field: "CarRegister",
      header: "CarRegister",
    },
    {
      field: "CustomerID",
      header: "CustomerID",
    },
    {
      field: "CustomerName",
      header: "CustomerName",
    },
    {
      field: "ProductID",
      header: "ProductID",
    },
    {
      field: "ProductName",
      header: "ProductName",
    },
    {
      field: "Remark1",
      header: "Remark1",
    },
    {
      field: "Remark2",
      header: "Remark2",
    },
    {
      field: "Remark3",
      header: "Remark3",
    },
    {
      field: "Remark4",
      header: "Remark4",
    },
    {
      field: "WeightIn",
      header: "WeightIn",
    },
    {
      field: "WeightOut",
      header: "WeightOut",
    },
    {
      field: "Weight",
      header: "Weight",
    },
    {
      field: "WeightNet",
      header: "WeightNet",
    },
  ];
  const setForm = useSetRecoilState(storeForm);
  useEffect(() => {
    setForm([]);
  }, []);
  return (
    <div>
      <AppNavber />
      <AppFetch
        title={"ข้อมูลชั่งน้ำหนัก"}
        fetchDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weight/read.php"
        }
        delDataURL={
          "https://theotesteng.000webhostapp.com/API/api/weight/delete.php"
        }
        fetchDataBody={fetchDataBody}
        delDataBody={delDataBody}
        columns={columns}
        minWidth={"100rem"}
        selectedlistOut={upDatedataID}
      />
    </div>
  );
}

export default AppWeight;
