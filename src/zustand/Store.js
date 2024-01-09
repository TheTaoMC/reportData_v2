import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create((set, get) => ({
  bears: 0,
  zu_ToggleResetState: false,
  zu_ToggleEdit: false,
  zu_ToggleVisible: false,
  zu_ToggleSearch: false,
  zu_SearchFilters: [
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
      From: new Date(),
      To: new Date(),

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
  ],
  zu_ToggleFetchFilter: false,
  zu_Data: [],
  zu_Form_AddEdit: null,
  zu_Title: "",
  zu_Title_Form_AddEdit: null,
  zu_SelectedList: [],
  zu_DataID: "",
  zu_ID: "",
  zu_Columns: [],

  zu_MasterCustomers: [],
  zu_MasterProducts: [],
  zu_MasterWeighttypes: [],
  zu_MasterDrivers: [],
  zu_MasterTransporters: [],

  zu_Url_Base: "https://theothai.com/ttw_webreport/API/api/",

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
  zuSetSearchFiltersCheckbox:(updatedFilters) => {
    
  },
  zuSetSearchFiltersTextbox:(updatedFilters) => set({ zu_SearchFilters: updatedFilters }),

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
  zuFetchMaster: async () => {
    try {
      //console.log(get().zu_Url_Fetch, get().zu_Option_Fetch);
      const responseCustomers = await fetch(
        get().zu_Url_Base + "customer/read.php",
        {
          method: "GET",
          headers: {
            "API-KEY": "857F7237C03246028748D51C97D4BADE",
          },
        }
      );
      const responseProducts = await fetch(
        get().zu_Url_Base + "product/read.php",
        {
          method: "GET",
        }
      );
      const responseWeighttypes = await fetch(
        get().zu_Url_Base + "weighttype/read.php",
        {
          method: "GET",
        }
      );
      const responseDrivers = await fetch(
        get().zu_Url_Base + "driver/read.php",
        {
          method: "GET",
        }
      );
      const responseTransporters = await fetch(
        get().zu_Url_Base + "transporter/read.php",
        {
          method: "GET",
        }
      );

      if (
        !responseCustomers.ok ||
        !responseProducts.ok ||
        !responseWeighttypes.ok ||
        !responseDrivers.ok ||
        !responseTransporters.ok
      ) {
        //set({ zu_Data: [] });
        throw new Error(
          `HTTP error! Status: ${
            (responseCustomers.status,
            responseProducts.status,
            responseWeighttypes.status,
            responseDrivers.status,
            responseTransporters.status)
          }`
        );
      }

      if (responseCustomers.ok) {
        const data = await responseCustomers.json();
        //console.log(data);
        set({ zu_MasterCustomers: data });
      }
      if (responseProducts.ok) {
        const data = await responseProducts.json();
        //console.log(data);
        set({ zu_MasterProducts: data });
      }
      if (responseWeighttypes.ok) {
        const data = await responseWeighttypes.json();
        //console.log(data);
        set({ zu_MasterWeighttypes: data });
      }
      if (responseDrivers.ok) {
        const data = await responseDrivers.json();
        //console.log(data);
        set({ zu_MasterDrivers: data });
      }
      if (responseTransporters.ok) {
        const data = await responseTransporters.json();
        //console.log(data);
        set({ zu_MasterTransporters: data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //set({ zu_Data: [] });
    }
  },
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
  zuToggleFetchFilter: () =>
    set((state) => ({ zu_ToggleFetchFilter: !state.zu_ToggleFetchFilter })),
}));
