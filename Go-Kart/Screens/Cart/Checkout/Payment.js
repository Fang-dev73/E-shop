import React, {useState} from "react";
import {View, Button, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Header,Icon,ListItem} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const methods = [
    {name: 'Cash on Delivery', value: 1},
    {name: 'UPI', value: 2},
    {name: 'Card Payment', value: 3}
]

const paymentcards = [
    {name: 'Go-Kart Wallet', value: 1},
    {name: 'Visa', value: 2},
    {name: 'MasterCard', value: 3},
    {name: 'Others', value: 4}
]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();

    return(
        <View>
            <Header
            centerComponent={{text:"Choose your Payment Method", style:{fontSize: 16, fontWeight:'bold'}}}
            backgroundColor={{color:'grey'}}
            >
            </Header>
            <View>
                {methods.map((item,index) => {
                    return(
                        <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                            <Text>{item.name}</Text>
                            <RadioButton
                            selected={selected == item.value}/>
                        </ListItem>
                    )
                })}
                {selected == 3 ? (
                    <Picker
                    mode="dropdown"
                    iosIcon={<Icon name={"arrow-down"}/>}
                    headerStyle={{ backgroundColor:'orange'}}
                    headerBackButtonTextStyle={{color: '#fff'}}
                    headerTitleStyle={{color: '#fff'}}
                    selectedValue={card}
                    onValueChange={(x) => setCard(x)}
                    >
                        {paymentcards.map((c,index) => {
                            return <Picker.Item 
                            key={c.name}
                            label={c.name} 
                            value={c.name}/>
                        })}
                    </Picker>
                ): null}
                <View style={{marginTop: 60, alignSelf:'center'}}>
                        <Button 
                        title="Confirm" 
                        onPress={() => props.navigation.navigate("Confirm", {order})}/>
                </View>
            </View>
        </View>
    )
}

export default Payment;