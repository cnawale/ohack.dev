import Login from '@/components/Login'
import Register from '@/components/Register'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, View, Text } from 'react-native';

export default function index() {

  const Stack = createNativeStackNavigator();
  // const bgImage = require("../assets/images/nmtsa.jpg")

  return (

    // <ImageBackground source={bgImage} style={{ flex: 1 }}>
    <View style={{flex:1, justifyContent:'center', backgroundColor:'#000000'}}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: 'fade',
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </View>
    // </ImageBackground>
  )
}