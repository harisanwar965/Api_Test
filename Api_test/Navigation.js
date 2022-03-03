import React from 'react';
import App from './App';
import Nav from './Nav';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Navigator = props => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nav">
        <Stack.Screen
          name="App"
          component={App}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{headerShown: false}}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
