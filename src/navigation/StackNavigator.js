import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Event from '../views/Event';
import EventDetail from '../views/Event/sub-view/EventDetail';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="event">
      <Stack.Screen
        name="event"
        component={Event}
        options={({route}) => ({
          title: 'EVENTS',
        })}
      />
      <Stack.Screen
        name="eventDetail"
        component={EventDetail}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitle: ' ',
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
