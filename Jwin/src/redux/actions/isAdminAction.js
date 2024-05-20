export const isAdmin = 'admin'
export const user = 'user'

export const is_admin = () => {
    return {
        type: isAdmin
    }
}

export const not_isAdmin = () => {
    return {
        type: user
    }
}