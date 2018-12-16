import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION  } from '../actions/types';

const initialState = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
}

export default function(state= initialState, action) {
    switch(action.type) {
        default: return state;
        case DISABLE_BALANCE_ON_ADD:
            return {
                ...state,
                disableBalanceOnAdd: !state.disableBalanceOnAdd
            }
        case DISABLE_BALANCE_ON_EDIT:
            return {
                ...state, 
                disableBalanceOnEdit:!state.disableBalanceOnEdit
            }
        case ALLOW_REGISTRATION:
            return {
                ...state,
                allowRegistration: !state.allowRegistration
            }
    }
} 