import { ADD_CONTACT, DELETE_CONTACT } from './actionTypes'

const initalState = {
    allContacts: [],
}

const contactReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                allContacts:[...state.allContacts, action.payload],
            }
        case DELETE_CONTACT:
            return {
                ...state,
                allContacts: state.allContacts.filter(
                    (contact) => contact.key !== action.payload),
            }
        default:
            return state;
    }
}

export default contactReducer;