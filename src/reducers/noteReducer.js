import * as type from '../constants/action-types';

const initialState = {
    is_busy: true,
    notes: []
};

export default function note_reducer(state = initialState, action){
    switch(action.type){
        case type.GET_NOTES:
        return Object.assign({}, state, action.payload);
        case type.FILTER_NOTES:
        console.log(action.payload);
        return Object.assign({}, state, action.payload);
        default:
        return state;
    }
}