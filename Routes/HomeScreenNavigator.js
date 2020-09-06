import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import BarberCard from '../Components/BarberCard';
import ConfirmationScreen from '../Screens/ConfirmationScreen';
import ServicesScreen from '../Screens/ServicesScreen';


export default function HomeScreenNavigator() {
    
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ServicesScreen' component={ServicesScreen} />
        <Stack.Screen name='BarberCard' component={BarberCard} />
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} />
      </Stack.Navigator>
    )
  }
