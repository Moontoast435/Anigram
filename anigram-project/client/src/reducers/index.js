import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import selected from './selected'
export default combineReducers({
    auth,
    profile,
    selected
});
