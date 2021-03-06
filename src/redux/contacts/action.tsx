import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "./actionTypes"

export const addContact = (payload: any) => {
    return (dispatch: any) =>{
        dispatch({
            type: ADD_CONTACT,
            payload,
        })
    }
}
export const editContact = (payload: any) => {
    return (dispatch: any) =>{
        dispatch({
            type: EDIT_CONTACT,
            payload,
        })
    }
}
export const deleteContact = (payload: any) => {
    return (dispatch: any) =>{
        dispatch({
            type: DELETE_CONTACT,
            payload,
        })
    }
}

