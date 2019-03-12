const initialState = {};

export default function note_reducer(state = initialState, action){
    switch(action.type){
        case '1':
        return 1;
        default:
        return state;
    }
}