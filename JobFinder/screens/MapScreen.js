import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import  MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends React.Component 
{ 
    state = 
    {
        region:
        {
            longitude: -122.0321823,
            latitude: 37.3229978,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09 
        },
        mapLoaded: false,
        jobSearching: false
    }

    componentDidMount()
    {
        // console.log(this.props);

        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = region =>
    {
        this.setState({ region });  
    }

    onButtonPress = () =>
    {
        this.setState({ jobSearching: true });

        this.props.fetchJobs(this.state.region, () =>
        {
            this.setState({ jobSearching: false });

            this.props.navigation.navigate('deck');
        });
    }

    render()
    {
        if(!this.state.mapLoaded)
        {
            return (
                <View style = {{ flex: 1, justifyContent: 'center' }}>
                   <ActivityIndicator size="large"/>
                </View>
            );
        }

        return (
            <View style = {{ flex: 1 }}>

                <MapView 
                    region = { this.state.region }
                    style = {{ flex: 1 }}
                    onRegionChangeComplete = { this.onRegionChangeComplete }
                />

                <View style = { styles.buttonContainer }>
                    <Button 
                        title="Search the area"
                        backgroundColor="#009688"
                        icon = {{ name: 'search' }}
                        onPress = { this.onButtonPress }
                        loading = { this.state.jobSearching }
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create(
{
    buttonContainer:
    {
        position: 'absolute',
        bottom: 20,
        width: "60%",
        left: "20%"
    }
})

export default connect(null, actions)(MapScreen);