import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
  
  } from '../actions/seanTypes';
  
  const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    status: '',
    adoptable: '',
    credentials: ''
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch(type) {
        case LOAD_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                first_name: payload.profile.first_name,
                last_name: payload.profile.last_name,
                phone: payload.profile.phone,
                city: payload.profile.city,
                status: payload.profile.status,
                adoptable: payload.profile.adoptable,
                credentials: payload.profile.credentials
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                username: '',
                first_name: '',
                last_name: '',
                phone: '',
                city: '',
                status: '',
                adoptable: '',
                credentials: ''
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }}
