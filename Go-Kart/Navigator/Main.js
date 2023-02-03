import React from 'react';
import {View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import CartIcon from '../Screens/Shared/CartIcon';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            options={{
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="home"
                            style={{ position: 'relative' }}
                            color={color}
                            size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <FontAwesome5Icon icon="fad fa-shopping-cart" />
                            <CartIcon />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="user"
                            color={color}
                            size={30} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;

