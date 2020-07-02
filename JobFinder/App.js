import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import registerForNotifications from './services/pushNotifications';
import { Notifications, AppLoading } from 'expo';
import { Alert, Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { ActivityIndicator } from 'react-native-paper';

class App extends React.PureComponent
{
	componentDidMount()
	{
		registerForNotifications();
		
		Notifications.addListener(notification =>
		{
			const { data: { text }, origin } = notification;

			if(origin === 'received' && text)
			{
				Alert.alert(
					'New Push Notification',
					text
					[{ text: 'OK' }]
				);
			}
		})
	}

	// Wrap your root component with PersistGate. This delays the rendering of your app's UI until your persisted state has been retrieved and 
	// saved to redux. NOTE the PersistGate loading prop can be null, or any react instance, e.g. loading={<Loading />}.
	render()
	{
		return (
			<Provider store = { store }>
				<PersistGate loading = { <ActivityIndicator /> } persistor = { persistor }>
					<MainNavigator />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;