import * as type from '../constants/action-types';

export default function getTags(payload){
    return {
        type: type.GET_TAGS,
        payload
    }
}