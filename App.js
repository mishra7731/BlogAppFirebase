import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"; 
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PostScreen from './src/screens/PostScreen';

import {AuthContext, AuthProvider} from './src/providers/AuthProvider';
const WelcomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const WelcomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
//const CommentOnPostStack = createStackNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator drawerStyle = {{backgroundColor:'#81baf0'}}>
      <AppDrawer.Screen name="Welcome" component={WelcomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

const WelcomePostStackScreen = () => {
  return(
    <WelcomeStack.Navigator initialRouteName = 'Welcome'>
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
      <WelcomeStack.Screen name="IndividualPost" component={PostScreen} options={{headerShown: false}} />
    </WelcomeStack.Navigator>

  );

};

const WelcomeTabScreen = () => {
  return (
    <WelcomeTab.Navigator 
      initialRouteName="Welcome" 
      activeColor = "white"
      shifting = {true}>
      <WelcomeTab.Screen 
        name="Welcome"
        component={WelcomePostStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor : "#0a184d",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="home" size={26} color="white" />
            ) : (
              <MaterialCommunityIcons name="home-outline" size={26} color="white" />
            ),
        }}
      />
      <WelcomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarColor : "#2b3b7a",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="notifications" size={24} color="white" />
            ) : (
              <MaterialIcons name="notifications-none" size={24} color="white" />
            ),
        }}
      />
      
    </WelcomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return(
    <AuthStack.Navigator initialRouteName = 'SignIn'>
      <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
    </AuthStack.Navigator>
  );

};

function App(){
  return(
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            { auth.IsLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/>}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

export default App;
