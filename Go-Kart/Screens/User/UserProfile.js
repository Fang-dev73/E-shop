import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/Urls/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios.get(`${baseURL}/users/${context.stateUser.user.sub}`, {
                    headers: { Authorization: `Bearer ${res}` }
                })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))

        return () => {
            setUserProfile();
        }

    }, [context.stateUser.isAuthenticated])
    return (
        <View>
            <ScrollView>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title='Logout'
                        onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)]} />
                </View>
            </ScrollView>
        </View>
    )
}
export default UserProfile;