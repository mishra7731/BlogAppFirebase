import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsynchronousStorageFunctions";
import NotificationComponent from "../components/NotificationComponent";

const NotificationScreen = (props) => {
  const [notificationList, setNotificationList] = useState([]);
  const [email, setEmail] = useState("");
  let notifyUser = email.concat("notify");

  const getNotificationData = async () => {
    await getDataJSON(notifyUser).then((data) => {
      if (data == null) {
        setNotificationList([]);
      } else setNotificationList(data);
    });
  };
  const getEmailData = async () => {
    await getDataJSON("mail").then((data) => {
      if (data == null) {
        setEmail("");
      } else setEmail(data);
    });
  };

  const init = async () => {
    await removeData(notifyUser);
  };

  useEffect(() => {
    getEmailData();
  }, [])

  useEffect(() => {
    getNotificationData();
  }, [notificationList])

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            backgroundColor='#29435c'
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog Notification", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />

          <Card containerStyle={styles.cardStyle}>
            <FlatList
              data={notificationList}
              renderItem={notificationItem => (
                <View style={{ alignItems: "center" }}>
                  <NotificationComponent
                    name={notificationItem.item.name}
                    email={notificationItem.item.email}
                    date={notificationItem.item.date}
                    post={notificationItem.item.post}
                    notification={notificationItem.item.notification}
                    type={notificationItem.item.type}
                  />
                  <Card.Divider />
                </View>
              )}
            />
          </Card>


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
    backgroundColor: 'white',
  },
  cardStyle: {
    backgroundColor: '#f6f7f0',
    flex: 1,
    alignItems: "center"

  }
});

export default NotificationScreen;