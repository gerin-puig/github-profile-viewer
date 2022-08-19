import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUser from './search';
import UserProfile from './components/UserProfile'
import List from './List';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchUser}
        />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name='List' component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}