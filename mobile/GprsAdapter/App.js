/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, StatusBar, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { white } from 'ansi-colors';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
       <StatusBar  backgroundColor="#F9A825" barStyle="light-content"> </StatusBar>
        <Image style={{width:250, height:250}} source={require('./logo.png')} />
        <TextInput style ={styles.inputBox} placeholder="UserName" laceholderTextColor="#F9A825"/>
        <TextInput style ={styles.inputBox} placeholder="Password" laceholderTextColor="#F9A825"/>
        <TouchableOpacity >
          <Text style ={styles.buttonText} >LogIn </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBC02D',
  },
  inputBox: {
    width:300,
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  buttonText: {
    width:300,
    backgroundColor: "#F9A825",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12.5,
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },

});
