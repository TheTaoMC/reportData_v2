import { create } from "zustand";

export const useStore = create((set, get) => ({
  bears: 0,
  zu_ToggleResetState: false,
  zu_ToggleEdit: false,
  zu_ToggleVisible: false,
  zu_ToggleSearch: false,
  zu_Data: [],
  zu_Form_AddEdit: null,
  zu_Title: "",
  zu_Title_Form_AddEdit: null,
  zu_SelectedList: [],
  zu_DataID: "",
  zu_ID: "",
  zu_Columns: [],
  zu_SearchFilters: [],

  zu_Url_Fetch: "",
  zu_Option_Fetch: {},

  zu_Url_Add: "",
  zu_Option_Add: {},

  zu_Url_Edit: "",
  zu_Option_Edit: {},

  zu_Url_Del: "",
  zu_Option_Del: {},
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  zuSetSearchFilters: (filters) => set({ zu_SearchFilters: filters }),
  zuSetFromAddEdit: (form) => set({ zu_Form_AddEdit: form }),
  zuSetColumns: (columns) => set({ zu_Columns: columns }),
  zuSetTitle: (title) => set({ zu_Title: title }),
  zuSetTitleFromAddEdit: (title) => set({ zu_Title_Form_AddEdit: title }),
  zuSetDataID: (dataID, id) => set({ zu_DataID: dataID, zu_ID: id }),
  zuSetFetch: (url, option) =>
    set({ zu_Url_Fetch: url, zu_Option_Fetch: option }),
  zuSetAdd: (url, option) => set({ zu_Url_Add: url, zu_Option_Add: option }),
  zuSetEdit: (url, option) => set({ zu_Url_Edit: url, zu_Option_Edit: option }),
  zuSetDel: (url, option) => set({ zu_Url_Del: url, zu_Option_Del: option }),
  zuFetch: async () => {
    try {
      console.log(get().zu_Url_Fetch, get().zu_Option_Fetch);
      const response = await fetch(get().zu_Url_Fetch, get().zu_Option_Fetch);
      if (!response.ok) {
        set({ zu_Data: [] });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        set({ zu_Data: data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ zu_Data: [] });
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      get().zuFetch();
      return response.ok;
    } catch (error) {
      console.error("Error Add data:", error);
    }
  },
  zuEditData: async () => {
    try {
      /*       console.log(
                    "76",
                    get().zu_Url_Edit,
                    get().zu_Option_Edit,
                    get().zu_SelectedList
                  );
                  console.log(get().zu_SelectedList);
                  console.log(typeof get().zu_SelectedList);
            
                  console.log(get().zu_SelectedList.length); */
      if (get().zu_DataID === "" || get().zu_ID === "") {
        return false;
      }

      if (get().zu_SelectedList.length === 0) {
        console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการแก้ไข");
        //console.log('79 ',get().zu_Url_Edit, get().zu_Option_Edit);
        return;
      }

      const response = await fetch(get().zu_Url_Edit, get().zu_Option_Edit);
      console.log("response");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data: ", data);
      set({ zu_SelectedList: [] });
      get().zuFetch();
      return response.ok;
    } catch (error) {
      console.error("Error Edit data:", error);
    }
  },
  zuDelData: async () => {
    //console.log(url, option, selectedlist);
    try {
      console.log(
        get().zu_Url_Del,
        get().zu_Option_Del,
        get().zu_SelectedList.DataID
      );
      // ตรวจสอบว่า selectedlist มีค่าหรือไม่
      if (get().zu_SelectedList.length === 0) {
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
  zuResetData: () => set({ zu_Data: [] }),
  zuSelectedList: (selected) => set({ zu_SelectedList: selected }),
  zuToggleResetState: () =>
    set((state) => ({ zu_ToggleResetState: !state.zu_ToggleResetState })),
  zuToggleEdit: () => set((state) => ({ zu_ToggleEdit: !state.zu_ToggleEdit })),
  zuToggleVisible: () =>
    set((state) => ({ zu_ToggleVisible: !state.zu_ToggleVisible })),
  zuToggleSearch: () =>
    set((state) => ({ zu_ToggleSearch: !state.zu_ToggleSearch })),
}));
