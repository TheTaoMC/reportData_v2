import { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import fetchData from "./FetchData";
import header from "./HeaderBtn";
import { useRecoilState } from "recoil";
import { storeDatas, storeOption, storeURL } from "../../recoilStore/Store";

import { useStore } from "../../zustand/Store";

function AppFetch({
  title,
  sortField,
  fetchDataURL,
  delDataURL,
  addDataURL,
  editDataURL,
  fetchDataBody,
  delDataBody,
  addDataBody,
  editDataBody,
  columns = [],
  minWidth,
  selectedlistOut,
  child,
  resetState,
  setState,
  onSearchFiltersChange,
}) {
  const { zu_Data, zuSelectedList } = useStore();

  const [Datas, setDatas] = useState([]);
  const [selectedlist, setSelectedlist] = useState(null);
  const dt = useRef(null);

  const [datas2, setDatas2] = useRecoilState(storeDatas);
  const [url, setUrl] = useRecoilState(storeURL);
  const [option, setOption] = useRecoilState(storeOption);
  //console.log("Load: ", url, option, datas2);
  /*   const fetchdata = async () => {
    try {
      await fetchData(url, option, setDatas2);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error; // ให้เรียก throw error เพื่อให้ catch ใน caller จัดการ
    }
  }; */
  const fetchdata = useCallback(async () => {
    try {
      await fetchData(url, option, setDatas2);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }, [url, option, setDatas2]);

  //load Data
  useEffect(() => {
    //fetchdata();
    //console.log("load Data");
    if (url && setDatas2) {
      fetchdata();
    }
  }, [url, setDatas2]);

  const funheader = () => {
    return header(
      title,
      child,
      selectedlist,
      delDataURL,
      delDataBody,
      setSelectedlist,
      fetchdata,
      dt,
      Datas,
      columns,
      addDataURL,
      addDataBody,
      editDataURL,
      editDataBody,
      resetState,
      setState,
      onSearchFiltersChange
    );
  };

  return (
    <>
      <div className="max-w-[95%] mx-auto">
        <div className="text-3xl font-bold flex justify-center my-2">
          {title}
        </div>
        <div className="card">
          <DataTable
            //tableClassName="text-red-500"
            //className="text-red-500"
            sortField={sortField}
            sortOrder={1}
            value={zu_Data}
            header={funheader}
            ref={dt}
            size="Small"
            showGridlines
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            scrollable
            scrollHeight={window.innerHeight - 250}
            tableStyle={{ minWidth: minWidth }}
            //selection
            selectionMode="single"
            selection={selectedlist}
            onSelectionChange={(e) => {
              setSelectedlist(e.value);
              selectedlistOut(e.value);
              zuSelectedList(e.value);
              //v2
            }}
            dataKey="DataID"
            metaKeySelection={true}
          >
            {columns.map((e, i) => (
              <Column
                key={i}
                field={e.field}
                header={e.header}
                sortable
                pt={{
                  headerCell: { className: "bg-sky-400" },
                  headerTitle: { className: " text-black" },
                  sort: { className: "color-red" },
                }}
              ></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default AppFetch;
