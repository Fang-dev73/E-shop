import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ListItem } from 'react-native-elements';
import EasyButton from '../../Shared/StyleComponents/EasyButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

const countries = require('../../../assets/data/countries.json');


const Checkout = (props) => {

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            zip
        }

        props.navigation.navigate("Payment", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}>
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"Home Address"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"Office Address"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"Zip Code"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" color={"blue"} />}
                    style={{ width: undefined }}
                    selectValue={country}
                    placeholder="Select your country"
                    placeholderStyle={{ color: "blue" }}
                    placeholderIconColor="blue"
                    onValueChange={(e) => setCountry(e)}
                >
                    {countries.map((c) => {
                        return <Picker.Item
                            key={c.code}
                            label={c.name}
                            value={c.name} />
                    })}
                </Picker>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <EasyButton
                        secondary
                        large
                        onPress={() => checkOut()}>
                        <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
                    </EasyButton>
                </View>
            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps)(Checkout);