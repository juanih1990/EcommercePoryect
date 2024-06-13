import { setCookie, deleteCookie } from '../../utils/utils.cookie'

export const LoggedIn = 'Logged_In'
export const loggedOut = 'Logged_Out'

export const logged_in = (token) => {
    setCookie('token', token, 7)
    return {
        type: LoggedIn,
        payload: { token }
    }
}

export const Logged_Out = () => {
    deleteCookie('token')
    return {
        type: loggedOut,
    }
}