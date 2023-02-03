import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

//Context API
import Auth from './Context/store/Auth';

//Navigators
import Main from './Navigator/Main';

//Screens
import Header from './Screens/Shared/Header';


LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

