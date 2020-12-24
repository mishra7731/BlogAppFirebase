import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar, Input, Header } from "react-native-elements";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";


const PostComponent = (props) => {

    
    return (
                <View>
                    <Card containerStyle={{ backgroundColor: '#cacfe8' }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                containerStyle={{ backgroundColor: "#f5fc9f" }}
                                size='medium'
                                rounded
                                icon={{ name: "user", type: "font-awesome", color: "black" }}
                                activeOpacity={1}
                            />
                            <Text h4Style={{ padding: 10 }} h4>
                                {props.name}
                            </Text>
                        </View>
                        <Text style={{ fontStyle: "italic" }}> Posted on {props.date}</Text>
                        <Text
                            style={{
                                paddingVertical: 10,
                            }}
                        >
                            {props.post}
                        </Text>
                        <Card.Divider />
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-between" }}
                        >
                            <Button buttonStyle={{ borderColor: '#2b0c4f', borderWidth: 1 }}
                                type="outline"
                                title={likeButton}
                                titleStyle={{ color: '#2b0c4f' }}
                                icon={<AntDesign name="like2" size={24} color='#2b0c4f' />}
                                onPress={async () => {
                                    let numberOfLikes = like + 1;
                                    await storeDataJSON(props.post.concat("likes"), numberOfLikes).then(() => {
                                        setLike(numberOfLikes);
                                    });

                                    if (auth.CurrentUser.email != props.email) {
                                    let arr2 = [
                                        ...notificationList,
                                        {
                                            name: props.name,
                                            email: props.email,
                                            date: moment().format("DD MMM, YYYY"),
                                            post: props.post,
                                            notification: auth.CurrentUser.name.concat(" liked your post"),
                                            key: like,
                                            type: "like",
                                        },
                                    ];


                                    await storeDataJSON(notifyUser, arr2).then(() => {
                                        setNotificationList(arr2);
                                    });

                                     }



                                }}
                            />
                            <Button buttonStyle={{ backgroundColor: '#2b0c4f' }}
                                type="solid"
                                title={numberOfComments}
                                titleStyle={{ color: '#d1d4c9',
                                    fontWeight : "bold" }}
                                onPress={function () {
                                    useStackNavigation.navigate("IndividualPost", { post: props.post, name: props.name, date: props.date, email: props.email });
                                }}


                            />
                        </View>
                    </Card>

                </View>
            
    )

}
export default PostComponent;

