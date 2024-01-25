import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppNavber from "../navbar/AppNavber";
import AppTable from "../table/AppTable";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import debounce from "lodash/debounce";
import { useStore } from "../../zustand/Store";

function AppProduct() {
  const {
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
    zuCheckUser,
  } = useStore();
  const uuidDataID = uuidv4();
  const navigate = useNavigate();
  /*   const [dataID, setDataID] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [flagCancel, setFlagCancel] = useState(false); */

  const [formData, setFormData] = useState([
    {
      DataID: uuidDataID,
      ProductID: "",
      ProductName: "",
      Price: 0.0,
      FlagCancel: false,
    },
  ]);

  console.log(formData);

  const resetState = () => {
    /*     setDataID("");
    setProductID("");
    setProductName("");
    setPrice(0.0);
    setFlagCancel(false); */

    const update = {
      ...formData,
      DataID: "",
      ProductID: "",
      ProductName: "",
      Price: 0.0,
      FlagCancel: false,
    };
    setFormData(update);
  };

  const setState = () => {
    /*     setDataID(zu_SelectedList.DataID);
    setProductID(zu_SelectedList.ProductID);
    setProductName(zu_SelectedList.ProductName);
    setPrice(zu_SelectedList.Price);
    setFlagCancel(zu_SelectedList.FlagCancel === "Y" ? true : false); */

    const update = {
      DataID: zu_SelectedList.DataID,
      ProductID: zu_SelectedList.ProductID,
      ProductName: zu_SelectedList.ProductName,
      Price: zu_SelectedList.Price,
      FlagCancel: zu_SelectedList.FlagCancel === "Y" ? true : false,
    };
    setFormData(update);
  };

  //setState
  useEffect(() => setState(), [zu_ToggleEdit]);
  //resetState
  useEffect(() => resetState(), [zu_ToggleResetState]);

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
      align: "right",
      alignHeader: "right",
      body: (rowData) => {
        return rowData.Price.toFixed(2);
      },
    },
    {
      field: "FlagCancel",
      header: "FlagCancel",
      align: "center",
      alignHeader: "center",
      body: (rowData) => {
        return rowData.FlagCancel === "N" ? "ใช้งาน" : "ยกเลิก";
      },
    },
  ];

  const updatedFormData = (value, fieldName) => {
    const newValue = value;
    const update = {
      ...formData,
      [fieldName]: newValue,
    };
    setFormData(update);
  };

  const addedit = (
    <div>
      <div>ProductID</div>
      <div>
        <InputText
          autoFocus
          className="w-[100%]"
          value={formData.ProductID}
          onChange={(e) => updatedFormData(e.target.value, "ProductID")}
        />
      </div>
      <div>ProductName</div>
      <div>
        <InputText
          className="w-[100%]"
          value={formData.ProductName}
          onChange={(e) => updatedFormData(e.target.value, "ProductName")}
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
              value={formData.Price}
              onValueChange={(e) => updatedFormData(e.value, "Price")}
              minFractionDigits={2}
              maxFractionDigits={7}
            />

            <label htmlFor="ingredient1">บาท</label>
          </div>

          <div className="flex gap-1 items-center">
            <Checkbox
              checked={formData.FlagCancel}
              onChange={(e) => updatedFormData(e.checked, "FlagCancel")}
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
        "https://theothai.com/ttw_webreport/API/api/product/create.php";
      const optionadd = {
        method: "POST",
        body: JSON
          .stringify
          /*           DataID: productID === "" ? "" : uuidDataID,
          ProductID: productID,
          ProductName: productName,
          Price: price,
          FlagCancel: flagCancel ? "Y" : "N", */
          //formData
          (),
      };
      console.log(formData);
      zuSetDataID(uuidDataID, formData.ProductID);
      zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    }

    if (zu_Title_Form_AddEdit === "edit") {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/product/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify(
          /*           DataID: dataID,
          ProductID: productID,
          ProductName: productName,
          Price: price,
          FlagCancel: flagCancel ? "Y" : "N", */
          formData
        ),
      };
      zuSetDataID(formData.DataID, formData.ProductID);
      zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, [formData]);

  //Load Data รอบแรก
  useEffect(() => {
    zuCheckUser(() => navigate("/"));
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/product/read.php";
    const optionread = {
      method: "GET",
      headers: {
        //"API-KEY": "857F7237C03246028748D51C97D4BADE",
      },
    };
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("สินค้า");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/product/delete.php";
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
      <AppTable sortField={"ProductName"} minWidth={"10rem"} />
    </div>
  );
}

export default AppProduct;
