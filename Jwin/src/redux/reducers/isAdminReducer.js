import { isAdmin, user } from '../actions/isAdminAction'

const initialState = {
    isAdmin: false
}

const isAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case isAdmin:
            return {
                ...state,
                isAdmin: true
            }
        case user:
            return{
                ...state,
                isAdmin: false
            }
        default: 
            return state
    }
}

export default isAdminReducer