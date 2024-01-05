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

function AppProduct() {
  const {  zuFetch, zuResetData } = useStore();

  const [data, setData] = useState("");
  const [dataID, setDataID] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0.0);
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
      ProductID: productID,
      ProductName: productName,
      Price: price,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const editDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID,
      ProductID: productID,
      ProductName: productName,
      Price: price,
      FlagCancel: flagCancel ? "Y" : "N",
    }),
  };

  const resetState = () => {
    setDataID("");
    setProductID("");
    setProductName("");
    setPrice(0.0);
    setFlagCancel(false);
  };

  const setState = () => {
    setDataID(data.DataID);
    setProductID(data.ProductID);
    setProductName(data.ProductName);
    setPrice(data.Price);
    setFlagCancel(data.FlagCancel === "Y" ? true : false);
  };

  const upDatedataID = (selectedlist) => {
    console.log("selectedlist:AppProduct:2 ", selectedlist);

    setData(selectedlist);
  };

  const columns = [
    {
      field: "ProductID",
      header: "ProductID",
    },
    {
      field: "ProductName",
      header: "ProductName",
    },
    {
      field: "Price",
      header: "Price",
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
    },
  ];

  const addedit = (
    <div>
      <div>ProductID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={productID}
          onChange={(e) => {
            //setDataID(e.target.value)
            setProductID(e.target.value);
          }}
        />
      </div>
      <div>ProductName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>Price</div>
      <div>
        <div className="flex gap-2  justify-between">
          <div className="flex gap-1 items-center">
            <InputNumber
              size={5}
              inputClassName="text-right"
              inputId="minmaxfraction"
              value={price}
              onValueChange={(e) => setPrice(e.value)}
              minFractionDigits={2}
              maxFractionDigits={7}
            />

            <label htmlFor="ingredient1">บาท</label>
          </div>

          <div className="flex gap-1 items-center">
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
      "https://theotesteng.000webhostapp.com/API/api/product/read.php";
    const option = {
      method: "GET",
    };
    zuFetch(url, option);
  }, []);
  return (
    <div>
      <AppNavber />
      <AppFetch
        sortField={"ProductName"}
        title={"สินค้า"}
        fetchDataURL={
          "https://theotesteng.000webhostapp.com/API/api/product/read.php"
        }
        delDataURL={
          "https://theotesteng.000webhostapp.com/API/api/product/delete.php"
        }
        addDataURL={
          "https://theotesteng.000webhostapp.com/API/api/product/create.php"
        }
        editDataURL={
          "https://theotesteng.000webhostapp.com/API/api/product/update.php"
        }
        fetchDataBody={fetchDataBody}
        delDataBody={delDataBody}
        addDataBody={productID === "" ? null : addDataBody}
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

export default AppProduct;
