export const setProfileUser = (username) => {
    return {
        type: 'SET_PROFILE',
        payload: username
    }
}

export const setChatUser = (username) => {
    return {
        type: 'SET_CHAT',
        payload: username
    }
}

export const removeProfileUser = () => {
    return {
        type: 'REMOVE_PROFILE'
    }
}

export const removeChatUser = () => {
    return {
        type: 'REMOVE_CHAT'
    }
}

