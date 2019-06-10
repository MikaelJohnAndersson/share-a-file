import * as types from '../actions';
import produce from 'immer';

// Extend standard Date API using sugar-date
require('sugar-date').Date.extend();

export default produce((draft, action) => {
    if (action.type == types.RETRIEVE_UPLOADS + '_FULFILLED'){
        // As to preserve added uploads (which normally would have been added to db and included in GET)
        // Only populate store with mock data if uploads is null
        if (!draft.uploads) {
            draft.uploads = action.payload;
        }
    }
    else if (action.type == types.UPLOAD_FILE + '_FULFILLED') {
        const uploadedFile = action.meta.file;
        const fileName = action.meta.file.name;

        const file = {
            name: fileName.length > 25? fileName.substring(0,25) + '...' : fileName,
            type: uploadedFile.type,
            size: uploadedFile.size,
            timeOfUpload: new Date().short(),
            timeOfExpire: new Date().advance({ days: action.meta.expiryTime }).short(),
            link: action.payload.link,
        };
        draft.uploads.push(file);
    }
}, {
    uploads: null,
});
