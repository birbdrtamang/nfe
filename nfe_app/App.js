import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

// import component 
import DrawerContent from './components/DrawerContent';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import TakeAttendance from './screens/TakeAttendance';
import ProfileScreen from './screens/ProfileScreen';
import UpdateAttendanceForm from './screens/UpdateAttendanceForm';
import Login from './screens/Login';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Take Attendance" component={TakeAttendance} />
      <Stack.Screen name="Update Attendance" component={UpdateAttendanceForm} />
    </Stack.Navigator>
  );
}

function DrawerNavigator({handleLogout,navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} handleLogout={handleLogout} navigation={navigation}/>}>
      <Drawer.Screen name="Non-Formal Education" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Function to update isLoggedIn state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

   // Function to update isLoggedIn state for logout
   const handleLogout = async() => {
    try {
      await AsyncStorage.removeItem('loginResponse');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      {isLoggedIn ? (
          // If user is logged in, show DrawerNavigator
          <DrawerNavigator handleLogout={handleLogout}/>
        ) : (
          // If user is not logged in, show Login screen
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login">
              {props => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
