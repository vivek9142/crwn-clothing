import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser : null
}
const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        /*these two cases essentially represents that if either of these actions
        are the case, this will be what gets returned.So we don't have to 
        write two separate case statements with their own exact identical 
        returns statement.*/

        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                error:null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser:null,
                error:null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error:action.payload
            };
        default: 
            return state;  
    }
}

export default userReducer;