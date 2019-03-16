import * as type from '../constants/action-types';

export default function saveNote(payload){
    return {
        type: type.SAVE_NOTE,
        payload
    };
}