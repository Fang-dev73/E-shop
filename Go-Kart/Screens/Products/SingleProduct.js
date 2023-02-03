import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, ScrollView, Button } from 'react-native';
import { Text } from "react-native-elements";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EasyButton from "../Shared/StyleComponents/EasyButton";
import TrafficLight from "../Shared/StyleComponents/TrafficLight";
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")

    useEffect(() => {
        if (props.route.params.item.countInStock == 0){
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable")
        }
        else if(props.route.params.item.countInStock <= 5){
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        }
        else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return() => {
            setAvailability(null);
            setAvailabilityText("")
        }
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image :
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUZKd7xCLYTQx-V8oNt7gfECBbcapw75FN9mBVYLW&s'
                        }}
                        resizeMode="contain"
                        style={styles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.Header}>{item.name}</Text>
                    <Text style={styles.Text}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{marginRight: 10, fontSize: 16}}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text style={{marginTop: 20, fontWeight: "bold"}}>{item.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Text style={styles.price} h4='true'>Rs.{item.price}</Text>
            </View>
            <View style={styles.add} >
                <EasyButton
                    primary
                    large
                    onPress={() => {
                        props.addItemToCart(item),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} added to your Cart`
                            })
                    }}>
                    <Text style={{ color: "white", fontSize: 20}}>Add</Text>
                </EasyButton>
            </View>
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
        position: 'relative',
        height: '100%'
    },
    ImageContainer: {
        backgroundColor: "white",
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    content: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    Text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    bottom: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 20,
        margin: 20,
        color: 'black',
        fontFamily: "Cochin",
        textAlign: 'left'
    },
    add: {
        alignItems: "flex-end",
        fontSize: 20,
        margin: 20,
        width: '90%'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    availability: {
        flexDirection: "row",
        marginBottom: 10
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct);
