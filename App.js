/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{ useState,useEffect }from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native';
import login from './Activity/LoginPage/Login';
import home from './Activity/HomePage/Home';
import absen from './Activity/AbsensiPage/Absen';
import selfie from './Activity/SelfieLogin/SelfieLogin';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from './Activity/SelfieLogin/node_modules/@react-navigation/stack'

const StackNavigator = createStackNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state={
            user:null,
            isLoggedIn:false
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={login}></Stack.Screen>
                    <Stack.Screen name="Home" component={home}></Stack.Screen>
                    <Stack.Screen name="Absen" component={absen}></Stack.Screen>
                    <Stack.Screen name="Selfie" component={selfie}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}



