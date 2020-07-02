import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';
import _ from 'lodash';

// REHYDRATE is the special action type of AutoRehydrate middleware.
import { REHYDRATE } from 'redux-persist/es/constants';

export default (state = [], action) =>
{
    switch(action.type)
    {
        // When redux-persist runs for the first time it finds 'action.payload.likedJobs' as undefined so we added or statement with empty array.
        case REHYDRATE:
            return ( action.payload ? action.payload.likedJobs : [] );
            
        case LIKE_JOB:
            return _.uniqBy( [action.payload, ...state], 'id' );

        case CLEAR_LIKED_JOBS:
            return [];
            
        default:
            return state;
    }
}