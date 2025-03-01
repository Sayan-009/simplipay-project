import { atom } from "recoil"

const userState = atom({
    key: "userState",
    default: null
})

const loadingState = atom({
    key: "localState",
    default: false
})

const errorState = atom({
    key: "errorState",
    default: null
})

const notificatonState = atom({
    key: "transactionHistoryState",
    default: []
})

export {userState, loadingState, errorState, notificatonState}