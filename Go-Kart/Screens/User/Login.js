import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import EasyButton from '../Shared/StyleComponents/EasyButton'
import FormContainer from '../Shared/Form/FormContainer'
import Input from '../Shared/Form/Input'
import Error from '../Shared/Error'


//Context
import AuthGlobal from '../../Context/store/AuthGlobal'
import { loginUser } from '../../Context/actions/Auth.actions'

const Login = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Logged In Successfully",
            })
            props.navigation.navigate("Home")
        }
    }, [context.stateUser.isAuthenticated])

    const Submit = () => {
        const user = {
            email, password
        }

        if (email === "" || password === "") {
            setError("Please enter your details")
        } else {
            loginUser(user, context.dispatch)
        }
    }

    return (
        <View>
            <FormContainer title={"Login"}>
                <Input
                    placeholder={"Enter Email"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Enter Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.button}>
                    {error ? <Error message={error} /> : null}
                    <EasyButton
                        large
                        primary
                        onPress={() => Submit()} >
                        <Text style={{ color: "white", fontSize:18, fontWeight:"bold"}}>Login</Text>
                    </EasyButton>
                </View>
                <View styles={[{ marginTop: 50 }, styles.button]}>
                    <Text style={styles.text}>Dont have an Account?</Text>
                    <EasyButton
                        large
                        secondary
                        onPress={() => props.navigation.navigate("Register")} >
                            <Text style={{ color: "white", fontSize:18, fontWeight:"bold"}}>Register</Text>
                        </EasyButton>
                </View>
            </FormContainer>
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
export default Login;