import { create } from "zustand";

export const useStore = create((set, get) => ({
  bears: 0,
  zu_toggle: false,
  zu_Data: [],
  zu_Form_AddEdit: null,
  zu_SelectedList: [],
  zu_DataID: "",
  zu_ID: "",

  zu_Url_Fetch: "",
  zu_Option_Fetch: {},

  zu_Url_Add: "",
  zu_Option_Add: {},

  zu_Url_Del: "",
  zu_Option_Del: {},
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  zuSetFromAddEdit: (form) => set({ zu_Form_AddEdit: form }),
  zuSetDataID: (dataID, id) => set({ zu_DataID: dataID, zu_ID: id }),
  zuSetFetch: (url, option) =>
    set({ zu_Url_Fetch: url, zu_Option_Fetch: option }),
  zuSetAdd: (url, option) => set({ zu_Url_Add: url, zu_Option_Add: option }),
  zuSetDel: (url, option) => set({ zu_Url_Del: url, zu_Option_Del: option }),
  zuFetch: async () => {
    try {
      const response = await fetch(get().zu_Url_Fetch, get().zu_Option_Fetch);
      if (!response.ok) {
        set({ zu_Data: [] });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        //setDatas(data);
        set({ zu_Data: data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ zu_Data: [] });
    }
  },
  zuDelData: async (url, option, selectedlist) => {
    //console.log(url, option, selectedlist);
    try {
      console.log(
        get().zu_Url_Del,
        get().zu_Option_Del,
        get().zu_SelectedList.DataID
      );
      // ตรวจสอบว่า selectedlist มีค่าหรือไม่
      if (selectedlist === "") {
        console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบzu");
        return;
      }

      const response = await fetch(get().zu_Url_Del, get().zu_Option_Del);

      if (!response.ok) {
        // หากไม่ปกติ ให้ throw ข้อผิดพลาด
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      set({ zu_SelectedList: [] });
      get().zuFetch();
      return data;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  },
  zuAddData: async () => {
    try {
      console.log(get().zu_DataID, get().zu_ID);
      if (get().zu_DataID === "" || get().zu_ID === "") {
        return false;
      }

      const response = await fetch(get().zu_Url_Add, get().zu_Option_Add);

      if (!response.ok) {
        // หากไม่ปกติ ให้ throw ข้อผิดพลาด
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      get().zuFetch();
      return response.ok;
    } catch (error) {
      console.error("Error Add data:", error);
    }
  },
  zuResetData: () => set({ zu_Data: [] }),
  zuSelectedList: (selected) => set({ zu_SelectedList: selected }),
  zuToggle: () => set((state) => ({ zu_toggle: !state.zu_toggle })),
}));
