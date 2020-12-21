import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card, Tile } from 'react-native-elements';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON } from "../functions/AsynchronousStorageFunctions";

const SignInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>
                    <Card containerStyle={styles.cardViewStyle}>
                        <Card.Title style={{ fontSize: 20, color: '#152a38' }}> Welcome to Blog App!</Card.Title>
                        <Card.Divider />
                        <Input
                            leftIcon={<MaterialIcons name="email" size={24} color="#152a38" />}
                            placeholder='Email Address'
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                            }}

                        />

                        <Input
                            leftIcon={<Feather name="key" size={24} color="#152a38" />}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <Button buttonStyle={{ backgroundColor: '#03083b' }}
                            icon={<AntDesign name="login" size={24} color="white" />}
                            title=' Sign In!'
                            titleStyle={{ color: 'white' }}
                            type='solid'
                            onPress={async function () {
                                let userData = await getDataJSON(Email);
                                if (userData != null && userData.password == Password) {
                                    auth.setIsLoggedIn(true);
                                    auth.setCurrentUser(userData);
                                   await storeDataJSON('mail',userData.email)
                                } else {
                                    alert("Login Failed!");
                                }
                            }}
                        />

                        <Button
                            type="clear"
                            icon={<AntDesign name="user" size={24} color="#152a38" />}
                            title=" Don't have an account? "
                            titleStyle={{ color: '#152a38' }}
                            onPress={function () {
                                props.navigation.navigate("SignUp");
                            }}


                        />
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#03083b'

    },
    cardViewStyle: {
        backgroundColor: '#d1d4c9',
        borderRadius: 10,

    },
});

export default SignInScreen;