import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import * as actions from '../actions';

class AuthScreen extends React.Component 
{ 
    componentDidMount()
    {
        this.props.facebookLogin();

        // This line is not necessarily.
        this.onAuthComplete(this.props);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps)
    {
        // console.log("Hello");

        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props =>
    {
        // console.log("Token (AuthScreen) : ",props.token);

        if(props.token)
        {
            this.props.navigation.navigate('main', { screen: 'map' });
        }
    }

    render()
    {
        return (
            <View>
                <Text>Baby Emilia</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{

})

const mapStateToProps = ( { auth } ) =>
{
    return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);