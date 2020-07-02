import React from 'react';

import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DeckScreen from '../screens/DeckScreen';
import MapScreen from '../screens/MapScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const JobStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();

const defaultStackNavOptions = (navigation, route) => 
{
	return (
	{	
		headerStyle: 
		{
			backgroundColor: Platform.OS === 'android' ? "#C2185B" : '',
		},
		headerTintColor: Platform.OS === 'android' ? 'black' : "#C2185B",
	})
}

const Review = props =>
{
	return (
		<JobStack.Navigator 
			screenOptions = { ({navigation, route}) => 
			{
				return defaultStackNavOptions(navigation, route)
			}}
		>
			<JobStack.Screen name="review" component = { ReviewScreen }/>
			<JobStack.Screen name="settings" component = { SettingsScreen }/>

		</JobStack.Navigator>
	);
}

const MainNavigator = props =>
{
	return (
		<MainBottomTab.Navigator 
			initialRouteName="map" 
			activeColor="black"
			inactiveColor="grey"
			barStyle =
			{{
				backgroundColor: "#C2185B",
			}}
		>
			<MainBottomTab.Screen name="map" component = { MapScreen } />
			<MainBottomTab.Screen name="deck" component = { DeckScreen } />
			<MainBottomTab.Screen name="review" component = { Review } />

		</MainBottomTab.Navigator>
	);
}

const JobTabNavigator = props =>
{
	return (
		<MainBottomTab.Navigator 
			initialRouteName="welcome" 
			activeColor="black"
			inactiveColor="grey"

			// Defaults to true. If false, all tabs are rendered immediately. When true, tabs are rendered only when they are made active for 
			// the first time. Note: tabs are not re-rendered upon subsequent visits.
			lazy

			// If tabBar returns null then it will hide the tab bar from all the screens mentioned in as screen components.
			// tabBar = { props => console.log(props) }
			barStyle =
			{{
				backgroundColor: "#C2185B",
			}}
		>
			
			<MainBottomTab.Screen name="welcome" component = { WelcomeScreen }  options = {{ tabBarVisible: false }} />
			<MainBottomTab.Screen name="auth" component = { AuthScreen } />
			<MainBottomTab.Screen name="main" component = { MainNavigator } options = {{ tabBarVisible: false }} />

		</MainBottomTab.Navigator>
	);
}

const MixtureComponents = props =>
{
	return (
		<NavigationContainer>
			<JobTabNavigator />
		</NavigationContainer>
	);
}

export default MixtureComponents;