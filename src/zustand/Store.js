import { create } from 'zustand'

export const useStore = create((set) => ({
    bears: 0,
    zu_Data: [],
    zu_SelectedList: [],
    zu_Url_Del: '',
    zu_Option_Del: {},
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    zuSetDel: (url, option) => set({ zu_Url_Del: url, zu_Option_Del: option }),
    zuFetch: async (url, option) => {
        try {
            const response = await fetch(url, option);
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
            console.error('Error fetching data:', error);
            set({ zu_Data: [] });
        }

    },
    zuDelData: async (url, option, selectedlist) => {
        try {
            console.log();
            // ตรวจสอบว่า selectedlist มีค่าหรือไม่
            if (selectedlist === '') {
                console.log("ไม่ได้เลือกข้อมูล กรุณาเลือกข้อมูลที่ต้องการลบzu");
                return;
            }

            const response = await fetch(url, option);

            if (!response.ok) {
                // หากไม่ปกติ ให้ throw ข้อผิดพลาด
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            //set({ zu_SelectedList: [] });
            //set({ zu_Data: data });
            return data


        } catch (error) {
            console.error("Error deleting data:", error);
        }
    },
    zuResetData: () => set({ zu_Data: [] }),
    zuSelectedList: (e) => set({ zu_SelectedList: e }),

}))