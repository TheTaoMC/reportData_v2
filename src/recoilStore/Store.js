import { atom, selector } from "recoil";



export const storeDatas = atom({
    key: 'datas',
    default: []
})
export const storeURL = atom({
    key: 'url',
    default: ''
})
export const storeOption = atom({
    key: 'option',
    default: {}
})

export const storeData = atom({
    key: 'data',
    default: []
})
export const storeColumns = atom({
    key: 'columns',
    default: []
})

export const storeKey = atom({
    key: 'key',
    default: ''
})



export const storeSelectedlist = atom({
    key: 'selected',
    default: null
})

export const storeForm = atom({
    key: 'form',
    default: null
})


export const filterSelect = selector({
    key: 'filter',
    get: ({ get }) => {
        const data = get(storeData)
        const column = get(storeColumns)
        return data, column
    }
})