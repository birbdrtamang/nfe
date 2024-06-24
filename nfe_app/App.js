import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; // Import Toast from react-native-toast-message

// Import your screens and components
import DrawerContent from './components/DrawerContent';
import HomeScreen from './screens/HomeScreen';
import TakeAttendance from './screens/TakeAttendance';
import ProfileScreen from './screens/ProfileScreen';
import UpdateAttendanceForm from './screens/UpdateAttendanceForm';
import Login from './screens/Login';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Take Attendance" component={TakeAttendance} />
      <Stack.Screen options={{ headerShown: false }} name="Update Attendance" component={UpdateAttendanceForm} />
    </Stack.Navigator>
  );
}

function DrawerNavigator({ handleLogout }) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} handleLogout={handleLogout} />}>
      <Drawer.Screen name="Non-Formal Education" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Function to update isLoggedIn state
  const handleLogin = () => {
    setIsLoggedIn(true);
    Toast.show({
      type: 'success',
      text1: 'Logged in successfully',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  // Function to update isLoggedIn state for logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loginResponse');
      setIsLoggedIn(false);
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Toast.show({
        type: 'error',
        text1: 'Error logging out',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <DrawerNavigator handleLogout={handleLogout} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login">
              {props => <Login {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaProvider>
  );
}
