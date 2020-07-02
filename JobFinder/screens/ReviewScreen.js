import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import  MapView from 'react-native-maps';

class ReviewScreen extends React.PureComponent
{ 
    componentDidMount()
    {
        this.props.navigation.setOptions(configureHeaderBar(this.props));
    }
    
    renderLikedJobs = () =>
    {
        return this.props.likedJobs.map(job =>
        {
            const initialRegion = 
            {
                longitude: job.geoLocation.longitude,
                latitude: job.geoLocation.latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02
            };
           
            return (
                <Card title = { job.title } key = { job.id }>
                    
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
        })
    }

    render()
    {
        return (
            <ScrollView>
                { this.renderLikedJobs() }
            </ScrollView>
        );
    }
}

const configureHeaderBar = props =>
{	
	return (
	{
		headerRight: () => (
            <Button 
                title="Settings"
                onPress = { () => { props.navigation.navigate("settings") }}
            />
        )
	});
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

const mapStateToProps = ({ likedJobs }) =>
{
    return {
        likedJobs,
    }
}

export default connect(mapStateToProps)(ReviewScreen);