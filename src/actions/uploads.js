import * as types from '.';
import { UPLOADS } from '../../dummy_db/uploads';

export function retrieveUploads(userId) {
    return (dispatch) => {   
        dispatch({
            type: types.RETRIEVE_UPLOADS,
            payload: {
                promise: new Promise(resolve => resolve(UPLOADS[userId].uploads)),
            },
        });
    };
}

export function uploadFile(file, expiryTime) {
    return (dispatch) => {
        const body = new FormData()
        body.append('file', file)
        
        dispatch({
            type: types.UPLOAD_FILE,
            meta: { file, expiryTime },
            payload: {
                promise: fetch('https://file.io', {
                    method: 'POST',
                    body: body,
                })
                .then(res => res.json())
            },
        });
    };
}
