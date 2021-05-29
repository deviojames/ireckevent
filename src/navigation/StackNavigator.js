import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Event from '../views/Event';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="event">
      <Stack.Screen name="event" component={Event} />
      <Stack.Screen
        name="eventDetail"
        component={Event}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
