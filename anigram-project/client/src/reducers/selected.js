const seedState = {profileUser : '', chatUser : ''}

export default function(state = seedState, action) {

    switch(action.type){
        case "SET_PROFILE":
            return {...state, profileUser:action.payload}
        case "SET_CHAT":
            return {...state, chatUser:action.payload}
        case "REMOVE_PROFILE":
            return {...state, profileUser:''}
        case "REMOVE_CHAT":
            return {...state, chatUser:''}
        default:
            return state
    }
}

