import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component 
{
    renderSlides = () =>
    {
        return this.props.data.map((slide, ind) =>
        {
            return (
                <View 
                    key = { slide.text } 
                    style = { [styles.slide, { backgroundColor: slide.color }] }
                >
                    <Text style = { styles.textStyle }>{ slide.text }</Text>

                    {
                        ind === this.props.data.length-1 ?
                            <Button 
                                title="Onwards"
                                raised
                                buttonStyle = { styles.buttonStyle }
                                onPress = { this.props.onComplete }
                            />
                        :
                            null
                    }

                </View>
            );
        })
    }

    render() 
    {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style = {{ flex: 1  }}
            >
                { this.renderSlides() }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create(
{
    slide:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle:
    {
        fontSize: 30,
        color: "#fff",
        marginBottom: 15
    },
    buttonStyle:
    {
        backgroundColor: "red"
    }
})