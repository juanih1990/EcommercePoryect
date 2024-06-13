import { LoggedIn, loggedOut } from '../actions/authActions';
import { getCookie } from '../../utils/utils.cookie';

const initialState = {
    isLogged: !!getCookie('token'),  // Verifica si el token existe en las cookies
    token: getCookie('token') || null,  // Obtiene el token de las cookies
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoggedIn:
            return {
                ...state,
                isLogged: true,
                token: action.payload.token,  // Asigna el token al estado
            };
        case loggedOut:
            return {
                ...state,
                isLogged: false,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer