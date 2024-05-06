import { LoggedIn, loggedOut } from '../actions/authActions';

const initialState = {
    isLogged: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoggedIn:
            return {
                ...state,
                isLogged: true
            };
        case loggedOut:
            return {
                ...state,
                isLogged: false
            };
        default:
            return state;
    }
};

export default authReducer