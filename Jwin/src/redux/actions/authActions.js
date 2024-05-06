export const LoggedIn = 'Logged_In'
export const loggedOut = 'Logged_Out'

export const logged_in = () => {
    return {
        type: LoggedIn,
    }
}

export const Logged_Out = () => {
    return {
        type: loggedOut,
    }
}