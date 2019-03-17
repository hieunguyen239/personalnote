import * as type from '../constants/action-types';

export default function updateNote(payload){
    return{
        type: type.UPDATE_NOTE,
        payload
    }
}