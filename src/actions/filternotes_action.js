import * as type from '../constants/action-types';

export default function filterNotes(payload){
    return{
        type: type.FILTER_NOTES,
        payload
    }
}