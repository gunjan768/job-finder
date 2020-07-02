import React from 'react';
import _ from 'lodash';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = 
[
    { text: 'Welcome to JobFinder App', color: "#03A9F4" },
    { text: 'Use this to get a job', color: "#009688" },
    { text: 'Set your location and then swipe away', color: "#03A9F4" }
];

class WelcomeScreen extends React.Component
{ 
    state =  { token: null }
    
    constructor(props)
    {
        super(props);

        checkIsAuthenticated = async () =>
        {
            // await AsyncStorage.removeItem('fb_token');

            const token = await AsyncStorage.getItem('fb_token');

            // console.log("Token (WelcomeScreen): ",token);

            if(token)
            {
                this.props.navigation.navigate('main', { screen: 'map' });

                this.setState({ token });
            }
            else
            {
                this.setState({ token: false });
            }
        }

        checkIsAuthenticated();
    }

    onSlidesComplete = () =>
    {
        this.props.navigation.navigate('auth');
    }

    render()
    {
        if(_.isNull(this.state.token))
        {
            return <AppLoading />;
        }

        return (
            <Slides 
                data = { SLIDE_DATA }
                onComplete = { this.onSlidesComplete }
            />
        );
    }
}


const styles = StyleSheet.create(
{

})

export default WelcomeScreen;