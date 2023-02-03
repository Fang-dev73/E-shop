import  React, {useState}  from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CartItem = (props) => {
    const data = props.item.item.product;
    const [quantity, setQuantity] = useState(props.item.item.quantity);

    return (
        <ListItem
            style={styles.listItem}
            key={Math.random()} avatar>
            <Avatar
                size='medium'
                source={{
                    uri: data.image ?
                        data.image :
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUZKd7xCLYTQx-V8oNt7gfECBbcapw75FN9mBVYLW&s'
                }} />
            <Text style={styles.nameItem}>{data.name}</Text>
            <Text style={styles.priceItem}>Rs. {data.price}</Text>
        </ListItem>
    )
}

const styles = StyleSheet.create({
listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
},
nameItem: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
},
priceItem: {
    fontSize: 16,
    fontFamily: "Cochin",
    fontWeight: "bold",
    color: 'black',
    textAlign: 'right'
},
})

export default CartItem;