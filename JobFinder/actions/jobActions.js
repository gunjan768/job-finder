import axios from 'axios';
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';

// Convert longitude and latitude to a zipcode. Requires use of Google's Geocoding API.
// import reverseGeocode from 'latlng-to-zip';

// A querystring parsing and stringifying library with some added security.
import qs from 'qs';

const JOB_SEARCH_URL = 'https://jobs.github.com/positions.json?';

const buildJobUrl = (latitude, longitude) =>
{
    // qs.stringfy() will convert the object into query params.
    const query = qs.stringify(
    { 
        lat: latitude,
        long: longitude
    });

    return `${JOB_SEARCH_URL}${query}`;
}

export const fetchJobs = ({ latitude, longitude }, callback) =>
{
    return async dispatch =>
    {
        try
        {
            // const response = await fetch(`https://api.codezap.io/v1/reverse?lat=${latitude}&lng=${longitude}`,
            // {
            //     type: 'HEADER',
            //     headers:
            //     {
            //         "api-key": ""
            //     }
            // });

            // const result = await response.json();

            // // console.log("Result (jobActions.js) : ",result);

            // const zipCode = result.address.postcode;

            const url = buildJobUrl(latitude, longitude);
        
            const { data } = await axios.get(url);
            
            const newJobArray = data.map(job => 
            { 
                return {
                    ...job,
                    geoLocation: { latitude, longitude }
                }
            })

            // console.log("Data (jobActions.js) : ", newJobArray);
            
            dispatch({ type: FETCH_JOBS, payload: newJobArray });
            
            callback();
        }
        catch(error)
        {
            throw error;
        }
    }
}

export const likeJob = job =>
{
    return {
        type: LIKE_JOB,
        payload: job
    };
}

export const clearLikedJobs = () =>
{
    return { type: CLEAR_LIKED_JOBS };
}
