import React, { useEffect, useState } from "react";
import AppNavber from "../navbar/AppNavber";
import AppFetch from "../fetch/AppFetch";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "../../zustand/Store";
function AppWeightreport() {
  const {
    zu_Data,
    zu_SelectedList,
    zu_ToggleResetState,
    zu_ToggleEdit,
    zu_Title_Form_AddEdit,
    zu_Title,
    zu_SearchFilters,
    zu_ToggleSearch,
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
  const [bodySearch, setBodySearch] = useState([
    {
      Title: "เครื่องชั่งขาเข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เครื่องชั่งขาออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เวลาชั่งเข้า",
      Filter: false,
      Typeinput: "calendar",

      From: new Date(),
      To: new Date(),
    },
    {
      Title: "เวลาชั่งออก",
      Filter: true,
      Typeinput: "calendar",
      /*       From: new Date(),
      To: new Date(), */
      From: "",
      To: "",
    },
    {
      Title: "เลขที่เข้า",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "เลขที่ออก",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Title: "ทะเบียนรถ",
      Filter: false,
      Typeinput: "text",
      From: "",
      To: "",
    },
    {
      Tablename: "weighttype",
      Title: "ประเภทชั่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "customer",
      Title: "คู่ค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "",
      To: "",
    },
    {
      Tablename: "product",
      Title: "สินค้า",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "transporter",
      Title: "ผู้ขนส่ง",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Tablename: "driver",
      Title: "พนักงานขับรถ",
      Filter: false,
      Typeinput: "dropdown",
      From: "Select a Country",
      To: "Select a Country",
    },
    {
      Title: "สถานะการยกเลิก",
      Filter: false,
      Typeinput: "Singledropdown",
      From: "",
      To: "",
    },
    {
      Title: "แสดงรถชั่งเสร็จ",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
    },
    {
      Title: "แสดงงรถค้างชั่ง",
      Filter: false,
      Typeinput: "",
      From: "",
      To: "",
    },
  ]);

  console.log(zu_SearchFilters);
  /*   const fetchDataBody2 = () => {
    const result = bodySearch.map((e, i) => {
      return {
        method: "POST",
        body: JSON.stringify({
          WeightScaleIDInFilter: e.Filter,
          WeightScaleIDInFrom: "",
          WeightScaleIDInTo: "",
          WeightScaleIDOutFilter: e.Filter,
          WeightScaleIDOutFrom: "",
          WeightScaleIDOutTo: "",
          SequenceWeightInFilter: e.Filter,
          SequenceWeightInFrom: "",
          SequenceWeightInTo: "",
          SequenceWeightOutFilter: e.Filter,
          SequenceWeightOutFrom: "",
          SequenceWeightOutTo: "",
          WeightDateInFilter: e.Filter,
          WeightDateInFrom: "",
          WeightDateInTo: "",
          WeightTimeInFilter: e.Filter,
          WeightTimeInFrom: "",
          WeightTimeInTo: "",
          WeightDateOutFilter: e.Filter,
          WeightDateOutFrom: "",
          WeightDateOutTo: "",
          WeightTimeOutFilter: e.Filter,
          WeightTimeOutFrom: "",
          WeightTimeOutTo: "",
          CarRegisterFilter: e.Filter,
          CarRegisterTo: "",
          CarRegisterFrom: "",
          WeightTypeIDFilter: e.Filter,
          WeightTypeIDFrom: "",
          WeightTypeIDTo: "",
          CustomerIDFilter: e.Filter,
          CustomerIDFrom: "",
          customerIDTo: "",
          ProductIDFilter: e.Filter,
          ProductIDFrom: "",
          ProductIDTo: "",
          TransporterIDFilter: e.Filter,
          TransporterIDFrom: "",
          TransporterTo: "",
          DriverIDFilter: e.Filter,
          DriverIDFrom: "",
          DriverIDTo: "",
          RFIDTagIDFilter: e.Filter,
          RFIDTagIDFrom: "",
          RFIDTagIDTo: "",
          FlagStatusFilter: e.Filter,
          FlagCancelFilter: e.Filter,
          FlagPaymentFilter: e.Filter,
        }),
      };
    });

    return result;
  }; */

  //console.log("bodySearch: ", bodySearch[0].Filter);
  //console.log('zu_SearchFilters: ',zu_SearchFilters);
  const option = {
    method: "POST",
    body: JSON.stringify({
      /*       WeightScaleIDInFilter: bodySearch[0].Filter,
      WeightScaleIDInFrom: bodySearch[0].From,
      WeightScaleIDInTo: bodySearch[0].To,
      WeightScaleIDOutFilter: bodySearch[1].Filter,
      WeightScaleIDOutFrom: bodySearch[1].From,
      WeightScaleIDOutTo: bodySearch[1].To,
      WeightDateInFilter: bodySearch[2].Filter,
      WeightDateInFrom: bodySearch[2].From,
      WeightDateInTo: bodySearch[2].To, */
      WeightDateOutFilter: bodySearch[3].Filter,
      WeightDateOutFrom: bodySearch[3].From,
      WeightDateOutTo: bodySearch[3].To,
      /*       SequenceWeightInFilter: bodySearch[4].Filter,
      SequenceWeightInFrom: bodySearch[4].From,
      SequenceWeightInTo: bodySearch[4].To,
      SequenceWeightOutFilter: bodySearch[5].Filter,
      SequenceWeightOutFrom: bodySearch[5].From,
      SequenceWeightOutTo: bodySearch[5].To, */
      CarRegisterFilter: bodySearch[6].Filter,
      CarRegisterTo: bodySearch[6].From,
      CarRegisterFrom: bodySearch[6].To,
      /*       WeightTypeIDFilter: bodySearch[7].Filter,
      WeightTypeIDFrom: bodySearch[7].To,
      WeightTypeIDTo: bodySearch[7].To,
      CustomerIDFilter: bodySearch[8].Filter,
      CustomerIDFrom: bodySearch[8].To,
      customerIDTo: bodySearch[8].To,
      ProductIDFilter: bodySearch[9].Filter,
      ProductIDFrom: bodySearch[9].To,
      ProductIDTo: bodySearch[9].To,
      TransporterIDFilter: bodySearch[10].Filter,
      TransporterIDFrom: bodySearch[10].To,
      TransporterTo: bodySearch[10].To,
      DriverIDFilter: bodySearch[11].Filter,
      DriverIDFrom: bodySearch[11].To,
      DriverIDTo: bodySearch[11].To, */
      //FlagCancelFilter: bodySearch[12].Filter ? "Y" : "N",
      //FlagStatusFilter: bodySearch[13].Filter ? "Y" : "N",
    }),
  };

  const funOption = () => {
    const option = {
      method: "POST",
      body: JSON.stringify({
        /*       WeightScaleIDInFilter: bodySearch[0].Filter,
        WeightScaleIDInFrom: bodySearch[0].From,
        WeightScaleIDInTo: bodySearch[0].To,
        WeightScaleIDOutFilter: bodySearch[1].Filter,
        WeightScaleIDOutFrom: bodySearch[1].From,
        WeightScaleIDOutTo: bodySearch[1].To,
        WeightDateInFilter: bodySearch[2].Filter,
        WeightDateInFrom: bodySearch[2].From,
        WeightDateInTo: bodySearch[2].To, */
        WeightDateOutFilter: zu_SearchFilters[3].Filter,
        WeightDateOutFrom: zu_SearchFilters[3].From,
        WeightDateOutTo: zu_SearchFilters[3].To,
        /*       SequenceWeightInFilter: bodySearch[4].Filter,
        SequenceWeightInFrom: bodySearch[4].From,
        SequenceWeightInTo: bodySearch[4].To,
        SequenceWeightOutFilter: bodySearch[5].Filter,
        SequenceWeightOutFrom: bodySearch[5].From,
        SequenceWeightOutTo: bodySearch[5].To, */
        CarRegisterFilter: zu_SearchFilters[6].Filter,
        CarRegisterTo: zu_SearchFilters[6].From,
        CarRegisterFrom: zu_SearchFilters[6].To,
        /*       WeightTypeIDFilter: bodySearch[7].Filter,
        WeightTypeIDFrom: bodySearch[7].To,
        WeightTypeIDTo: bodySearch[7].To,
        CustomerIDFilter: bodySearch[8].Filter,
        CustomerIDFrom: bodySearch[8].To,
        customerIDTo: bodySearch[8].To,
        ProductIDFilter: bodySearch[9].Filter,
        ProductIDFrom: bodySearch[9].To,
        ProductIDTo: bodySearch[9].To,
        TransporterIDFilter: bodySearch[10].Filter,
        TransporterIDFrom: bodySearch[10].To,
        TransporterTo: bodySearch[10].To,
        DriverIDFilter: bodySearch[11].Filter,
        DriverIDFrom: bodySearch[11].To,
        DriverIDTo: bodySearch[11].To, */
        //FlagCancelFilter: bodySearch[12].Filter ? "Y" : "N",
        //FlagStatusFilter: bodySearch[13].Filter ? "Y" : "N",
      }),
    };
    return option;
  };

  useEffect(() => {
    if (zu_SearchFilters.length === 0) {
      return;
    }
    const option = funOption();
    console.log("0000", option);
  }, [zu_SearchFilters]);

  /*   const fetchDataBody1 = {
    method: "POST",
    body: JSON.stringify({
      WeightTimeInFilter: false,
      WeightTimeInFrom: "",
      WeightTimeInTo: "",
    }),
  };
 */
  /*   const delDataBody = {
    method: "POST",
    body: JSON.stringify({
      DataID: dataID.DataID,
    }),
  }; */

  /*   const upDatedataID = (selectedlist) => {
    setDataID(selectedlist);
  }; */

  /*   useEffect(() => {
    if (zu_SearchFilters.length === 0) {
      return;
    }
    console.log(zu_ToggleSearch);
    console.log(zu_SearchFilters);
    setBodySearch(zu_SearchFilters);
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
    const optionread = option;
    zuSetFetch(urlread, optionread);
    zuFetch();
  }, [zu_ToggleSearch]); */

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

  /*   const handleSearchFiltersChange = (filters) => {
    setBodySearch(filters);
  }; */

  //setFromAddEdit //AddData
  useEffect(() => {
    if (zu_Title_Form_AddEdit === "add") {
      /* if (zu_SelectedList.length === 0) { */
      console.log("Add...");
      const uuidDataID = uuidv4();
      const urladd =
        "https://theothai.com/ttw_webreport/API/api/weightreport/create.php";
      const optionadd = {
        method: "POST",
        body: JSON.stringify({
          /*           DataID: driverID === "" ? "" : uuidDataID,
          DriverID: driverID,
          DriverName: driverName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N", */
        }),
      };
      //zuSetDataID(uuidDataID, driverID);
      //zuSetFromAddEdit(addedit);
      zuSetAdd(urladd, optionadd);
      console.log(urladd, optionadd);
    } else {
      console.log("Edit...");
      const urledit =
        "https://theothai.com/ttw_webreport/API/api/weightreport/update.php";
      const optionedit = {
        method: "POST",
        body: JSON.stringify({
          /*           DataID: dataID,
          DriverID: driverID,
          DriverName: driverName,
          Address1: address1,
          Address2: address2,
          FlagCancel: flagCancel ? "Y" : "N", */
        }),
      };
      //zuSetDataID(dataID, driverID);
      //zuSetFromAddEdit(addedit);
      zuSetEdit(urledit, optionedit);
      console.log(urledit, optionedit);
    }
  }, []);

  //Load Data รอบแรก
  useEffect(() => {
    zuResetData();
    const urlread =
      "https://theothai.com/ttw_webreport/API/api/weightreport/read.php";
    const optionread = option;
    zuSetFetch(urlread, optionread);
    zuSetColumns(columns);
    zuSetTitle("รายงานชั่ง");
    zuFetch();
  }, []);

  //setDel
  useEffect(() => {
    if (zu_SelectedList.length === 0) {
      return;
    }
    const urldel =
      "https://theothai.com/ttw_webreport/API/api/weightreport/delete.php";
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
      <AppFetch minWidth={"50rem"} />
    </div>
  );
}

export default AppWeightreport;
