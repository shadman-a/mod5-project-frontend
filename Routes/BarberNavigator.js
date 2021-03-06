import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarberScreen from '../Screens/BarberScreen';
import BarberCard from '../Components/BarberCard';
import ConfirmationScreen from '../Screens/ConfirmationScreen';
import ServicesScreen from '../Screens/ServicesScreen';


export default function HomeScreenNavigator() {
    
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='BarberScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name='BarberScreen' options={{ headerShown: false }} component={BarberScreen} />
        <Stack.Screen name='ServicesScreen' component={ServicesScreen} options={{ title: 'Services' }}/>
        <Stack.Screen name='BarberCard' component={BarberCard} options={{ title: 'Schedule Your Cut' }}/>
        <Stack.Screen name='ConfirmationScreen' component={ConfirmationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }