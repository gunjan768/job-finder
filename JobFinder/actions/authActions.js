import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

const APP_ID = "";
const APP_NAME = "";

export const facebookLogin = () =>
{
    return async dispatch =>
    {
        const token = await AsyncStorage.getItem('fb_token');

        // console.log({token})

        if(token)
        {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        }
        else
        {
            doFacebookLogin(dispatch);
        }
    }
}

const doFacebookLogin = async dispatch =>
{
    await Facebook.initializeAsync(APP_ID, APP_NAME);

    let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID,
    {
        permissions: ['public_profile']
    });

    if(type === 'cancel')
    {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
    else
    {
        await AsyncStorage.setItem('fb_token', token);
        
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    }
}
