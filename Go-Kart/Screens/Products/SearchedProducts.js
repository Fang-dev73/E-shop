import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import {ListItem, Text, Avatar } from 'react-native-elements';

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return (
        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Detail", { item: item })
                        }}
                        key={item._id.$oid}
                        avatar
                    >
                        <Avatar
                            source={{
                                uri: item.image ?
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                            }}
                        />
                        <View>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </View>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;