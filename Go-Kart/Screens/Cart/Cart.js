import React from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Avatar, Button, } from 'react-native-elements';
import EasyButton from "../Shared/StyleComponents/EasyButton";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import * as action from '../../Redux/Actions/cartActions';
import CartItem from "./CartItem";

var { height, width } = Dimensions.get('window');

const Cart = (props) => {
    var total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });
    console.log(props.cartItems);
    return (
        <>
            {props.cartItems.length ? (
                <ScrollView>
                    <Text style={styles.heading}>Cart</Text>
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hidden}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}>
                                    <Icon name="trash" color={"white"} size={24} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={50}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75} />
                    <View>
                        <Text style={styles.totalPrice}> Total: {total}</Text>
                        <View style={styles.buttons}>
                            <EasyButton
                                tertiary
                                large
                                onPress={() => props.clearCart()}>
                                <Text style={{ color: "white", fontSize: 18 }}>Clear</Text>
                            </EasyButton>
                            <EasyButton
                                primary
                                large
                                title={"Checkout"}
                                onPress={() => props.navigation.navigate('Checkout')}>
                                <Text style={{ color: "white", fontSize: 18 }}>Checkout</Text>
                            </EasyButton>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.cartText}>
                    <Text style={{ fontSize: 24 }} >Your cart is empty</Text>
                    <Text style={{ fontSize: 24 }}>:(</Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },
    cartText: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    totalPrice: {
        fontSize: 20,
        margin: 20,
        fontWeight: "bold",
        color: 'red',
        textAlign: 'right'
    },
    buttons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    hidden: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 25,
        height: 70,
        width: width / 1.2
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(action.clearCart()),
        removeFromCart: (item) => dispatch(action.removeFromCart(item))
    }

}

const mapStateTopProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Cart);