import React from "react";
import { StyleSheet, View, Dimensions, Image, Text, Button } from "react-native";
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import EasyButton from "../Shared/StyleComponents/EasyButton";
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { color } from "react-native-elements/dist/helpers";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.image}
                resizeMode="contain"
                source={{ uri: image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUZKd7xCLYTQx-V8oNt7gfECBbcapw75FN9mBVYLW&s' }} />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name}
            </Text>
            <Text style={styles.price}>Rs.{price}</Text>

            {countInStock > 0 ? (
                <View style={{ marginBottom: 100 }}>
                    <EasyButton
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(props),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${name} added to your Cart`
                                })
                        }}>
                        <Text style={{ color: "white" }}>Add</Text>
                    </EasyButton>
                </View>
            ) : <Text style={{ marginTop: 50 }}>Currently unavailable</Text>
            }
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product }))
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    price: {
        fontSize: 20,
        fontFamily: "Cochin",
        color: 'black',
        marginTop: 10
    }

})

export default connect(null, mapDispatchToProps)(ProductCard);