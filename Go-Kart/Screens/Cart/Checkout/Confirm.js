import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";

import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'

var { width, height } = Dimensions.get("window")
const Confirm = (props) => {

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart")
        }, 24)
    }

    const confirm = props.route.params
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Confirm Order</Text>
                {props.route.params ?
                    <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                        <Text style={styles.shipping}> Shipping to:</Text>
                        <View style={{ padding: 8 }}>
                            <Text style={styles.text}>Address: {confirm.order.order.shippingAddress1}</Text>
                            <Text style={styles.text}>Address2: {confirm.order.order.shippingAddress2}</Text>
                            <Text style={styles.text}>City: {confirm.order.order.city}</Text>
                            <Text style={styles.text}>Zip Code: {confirm.order.order.zip}</Text>
                            <Text style={styles.text}>Country: {confirm.order.order.country}</Text>
                        </View>
                        <Text style={styles.shipping}>Items:</Text>
                        {confirm.order.order.orderItems.map((x) => {
                            return (
                                <ListItem
                                    style={styles.item}
                                    key={x.product.name}
                                    avatar>
                                    <Avatar
                                        size={70}
                                        source={{ uri: x.product.image }} />
                                    <View style={styles.body}>
                                        <Text style={{ fontSize: 20 }}>{x.product.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color:'red' }}>
                                            Rs. {x.product.price}</Text>
                                    </View>

                                </ListItem>
                            )
                        })}
                    </View> : null}
                    <View style={{alignItems:'center', margin: 20}}>
                        <Button title="Place Order" onPress={confirmOrder}/>
                    </View>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart)
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,

    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 20,
        fontWeight: 'bold'
    },
    item: {
        width: width / 1.2,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default connect(null,mapDispatchToProps)(Confirm);