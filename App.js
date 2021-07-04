import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import WelcomeScreen from './Screens/WelcomeScreen'


export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen}

})

const AppContainer =  createAppContainer(switchNavigator);


