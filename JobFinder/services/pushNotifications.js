import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export default async () =>
{
    const previousToken = await AsyncStorage.getItem('pushToken');

    // console.log({previousToken});

    if(previousToken)
    return;
    
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if(status !== 'granted')
    return;

    const { data } = await Notifications.getExpoPushTokenAsync();

    // console.log({data});
    
    await axios.post('http://rallycoding.herokuapp.com/api/tokens',
    {
        token: { data }
    });

    AsyncStorage.setItem('pushToken', data);
}