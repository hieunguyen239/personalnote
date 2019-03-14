import * as type from '../constants/action-types';

export default function getNotes(payload){
    return {
        type: type.GET_NOTES,
        payload
    };
}