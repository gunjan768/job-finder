import React, { useState, useEffect, useReducer, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import  MapView from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';

class DeckScreen extends React.Component
{ 
    renderCard = job =>
    {
        const initialRegion = 
        {
            longitude: job.geoLocation.longitude,
            latitude: job.geoLocation.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        };

        return (
            <Card title = { job.title }>

                <View style = {{ height: 150 }}>
                    <MapView 
                        scrollEnabled = { false }
                        style = {{ flex: 1 }}

                        // cacheEnabled tells you that that the map you want be a plain image or very live and real component. By setting
                        // cacheEnabled true it renders map as plain staic image  
                        cacheEnabled = { Platform.OS === 'android' ? true : false }
                        initialRegion = { initialRegion }
                    />
                </View>

                <View style = { styles.Container }>
                    <Text>{ job.company }</Text>
                    <Text>{ job.company_url }</Text>
                    <Text>{ job.location }</Text>
                </View>

            </Card>
        );
    }

    renderNoMoreCards = () =>
    {
        return (
            <Card title="No more Jobs">
                <Button
                    title="Back to map"
                    backgroundColor="#03A9F4"
                    large
                    icon = {{ name: 'my-location' }}
                    onPress = { () => this.props.navigation.navigate('main', { screen: 'map' }) }
                />
            </Card>
        );
    }

    render()
    {
        // console.log("JOB (DeckScreen) : ",this.props.jobs);
        
        return (
            <View style = {{ marginTop: 10 }}>
                <Swipe 
                    data = { this.props.jobs }
                    renderCard = { this.renderCard }
                    renderNoMoreCards = { this.renderNoMoreCards }
                    onSwipeRight = { job => this.props.likeJob(job) }
                    keyProp="id"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    Container:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
})

const mapStateToProps = ({ jobs }) =>
{
    return {
        jobs,
    }
}

export default connect(mapStateToProps, actions)(DeckScreen);