import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, Header } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import ChoosePhotoComponent from "../components/ChoosePhotoComponent";
import { removeData } from "../functions/AsynchronousStorageFunctions";

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.rootViewStyle}>
          <Header
            backgroundColor='#29435c'
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blogger's Profile", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />


          <View>
            {/* <Image source={require('../../assets/ProfilePicture.jpg')} /> */}
            <ChoosePhotoComponent/>
            <Text style={{ 
              fontSize: 30, 
              fontStyle : "italic",
              fontWeight : "bold",
              color: '#070ad9', 
              marginBottom: 20,
              alignSelf : "center",
              marginTop : 20 }}> {auth.CurrentUser.name} </Text>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>Born on: 3rd March, 1998</Text>
            <Text style={styles.textStyle}>Lives At Dhaka, Bangladesh</Text>
            <Text style={styles.lastTextStyle}>Studies at Software Enginnering IUT, OIC</Text>
          </View>
          <Button buttonStyle={{ 
              marginTop: 30, 
              width: 200, 
              borderRadius: 10,
              backgroundColor : "#08095e" }}
            icon={<MaterialIcons name="delete" size={24} color="white" />}
            title=' Delete Profile'
            titleStyle={{ 
              color: 'white', 
              fontWeight : "bold" }}
            type='solid'
            onPress= { function () {
                removeData(auth.CurrentUser.email);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: 'white',
  },
  
  textStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf : "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    color: 'white',
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: 300,
  },
  lastTextStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf : "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    color: 'white',
    width: 300,
  },
  textViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#08095e",
    borderRadius: 20,
  },

});

export default ProfileScreen;