import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddTodo from './screens/AddTodo';
const Stack = createNativeStackNavigator();
export default function App() {
  console.log('App working fine , happy coding ! :D ');
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#ac3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
        }} component={HomeScreen} />
        <Stack.Screen name="AddTodo"
          options={{
            title: 'Add todo',
            headerStyle: {
              backgroundColor: '#ac3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'slide_from_right',
          }} component={AddTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
