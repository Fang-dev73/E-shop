import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, ToastAndroid } from 'react-native'
import EasyButton from '../Shared/StyleComponents/EasyButton'
import FormContainer from '../Shared/Form/FormContainer'
import Input from '../Shared/Form/Input'
import Error from '../Shared/Error'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import baseURL from '../../assets/Urls/baseUrl'

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const Submit = () => {
        if (email === '' || name === '' || phone === '' || password === '') {
            setError("Please enter your details")
        }

        let user = {
            email: email,
            name: name,
            phone: phone,
            password: password
        }

        axios
            .post(`${baseURL}/users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Successful",
                        text2: "Please Login to your Account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login")
                    }, 2000)

                }
            }).catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again later"
                });
            });
    }

    return (
        <View>
            <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}
            >
                <FormContainer title={"Register"}>
                    <Input
                        placeholder={"Enter Email"}
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                    />
                    <Input
                        placeholder={"Enter Name"}
                        name={"name"}
                        id={"name"}
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        placeholder={"Enter Phone No."}
                        name={"phone"}
                        id={"phone"}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <Input
                        placeholder={"Enter Password"}
                        name={"password"}
                        id={"password"}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={styles.button}>
                        {error ? <Error message={error} /> : null}
                        <EasyButton
                            large
                            primary
                            onPress={() => Submit()}>
                            <Text style={{ color: "white", fontSize: 18, fontWeight:"bold"}}>Register</Text>
                        </EasyButton>

                    </View>
                    <View style={[{ marginTop: 50 }, styles.button]}>
                        <Text style={styles.text}>Already have an Account?</Text>
                        <EasyButton
                        large
                        secondary
                            onPress={() => props.navigation.navigate("Login")}>
                                <Text style={{ color: "white", fontSize:18, fontWeight:"bold"}}>Login</Text>
                            </EasyButton>
                    </View>
                </FormContainer>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        marginTop: 20,
        marginBottom: 10
    }
})

export default Register;