import React, { useState, useEffect, useReducer, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import { clearLikedJobs } from '../actions';

class SettingScreen extends React.PureComponent
{ 
    componentDidMount()
    {
        this.props.navigation.setOptions(configureHeaderBar(this.props));
    } 

    render()
    {
        return (
            <Button
                title="Reset Liked Jobs"
                backgroundColor="#03A9F4"
                large
                icon = {{ name: 'delete-forever' }}
                onPress = { () => this.props.clearLikedJobs() }
            />
        );
    }
    
}

const configureHeaderBar = props =>
{	
	return (
	{
		headerTitle: ''
	});
}

const styles = StyleSheet.create(
{

})

export default connect(null, { clearLikedJobs })(SettingScreen);