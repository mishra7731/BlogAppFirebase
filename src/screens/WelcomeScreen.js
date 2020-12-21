import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import PostComponent from "../components/PostComponent";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import moment from "moment";

const WelcomeScreen = (props) => {
  const [postText, setPostText] = useState("");
  const [postList, setPostList] = useState([]);

  const getData = async () => {
    await getDataJSON("posts").then((data) => {
      if (data == null) {
        setPostList([]);
      } else setPostList(data);
    });
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            backgroundColor='#0c0e66'
            leftComponent={{
              icon: "menu",
              color: "#ffffff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog Timeline", style: { color: "#ffffff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#ffffff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <Card containerStyle={{ backgroundColor: '#edd1d5' }}>
            <Input
              placeholder="What's On Your Mind?"
              multiline = {true}
              leftIcon={<Entypo name="pencil" size={24} color="#152a38" />}
              onChangeText={function (currentInput) {
                setPostText(currentInput);
              }}
            />
            <Button buttonStyle={{ 
                backgroundColor: '#0c0e66',
                alignSelf : "flex-start",
                width : 80 }}
              title="Post"
              titleStyle={{ color: 'white' }}
              type="solid"
              onPress={async () => {
                let arr = [
                  ...postList,
                  {
                    name: auth.CurrentUser.name,
                    email: auth.CurrentUser.email,
                    date: moment().format("DD MMM, YYYY"),
                    post: postText,
                    key: postText,
                  },
                ];

                await storeDataJSON("posts", arr).then(() => {
                  setPostList(arr);
                });

              }} />


          </Card>
          <FlatList
            data={postList}
            renderItem={postItem => (
              <PostComponent
                name={postItem.item.name}
                date={postItem.item.date}
                post={postItem.item.post}
                email={postItem.item.email}

              />

            )}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default WelcomeScreen;