import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SetAlarmScreen from './screens/SetAlarmScreen';
import AlarmRingingScreen from './screens/AlarmRingingScreen';
import BarcodeScanner from '../components/BarcodeScanner';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SetAlarm" component={SetAlarmScreen} />
      <Stack.Screen name="AlarmRinging" component={AlarmRingingScreen} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
    </Stack.Navigator>
  );
}
