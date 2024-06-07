import React, {useEffect,useState} from 'react';
import { View, StyleSheet, Text, Image,ActivityIndicator} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// get initial 
const getInitials = (fullName) => {
  const namesArray = fullName.trim().split(' ');
  if (namesArray.length === 1) return namesArray[0].charAt(0);
  const initials = namesArray[0].charAt(0) + namesArray[namesArray.length - 1].charAt(0);
  return initials.toUpperCase();
};

// initail variable 
// const initials = getInitials(userData.full_name);

export default function DrawerContent({props,handleLogout}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const storedResponse = await AsyncStorage.getItem('loginResponse');
  //       if (storedResponse !== null) {
  //         console.log('Stored response:', storedResponse); // Log the raw stored data
  //         const parsedResponse = JSON.parse(storedResponse);
  //         console.log('Parsed response:', parsedResponse); // Log the parsed data
  //         setUserData(parsedResponse.user);
  //       } else {
  //         console.log('No data found in AsyncStorage for key: loginResponse');
  //       }
  //     } catch (error) {
  //       setError('Error retrieving data from AsyncStorage');
  //       console.error('Error retrieving data from AsyncStorage:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>{error}</Text>
  //     </View>
  //   );
  // }

  // if (!userData) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>No user data available.</Text>
  //     </View>
  //   );
  // }

  const Logout = () => {
    handleLogout();
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
            <View style={styles.profileCircle}>
                <Text style={styles.profileInitials}>SW</Text>
            </View>
            <Title style={styles.title}>Sonam Yangden</Title>
            <Caption style={styles.caption}>@sonam_w</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => navigation.navigate('Home')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => navigation.navigate('Profile')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="arrow-collapse-left" color={color} size={size} />
            )}
            label="Logout"
            onPress={Logout}
          />
          {/* Add more DrawerItem components as needed */}
        </Drawer.Section>
        <View style={styles.footer}>
            <Text style={styles.footertext}>Ministry of Education</Text>
            <Text style={styles.footertext}>Copyright © 2024</Text>
        </View>
        
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
    footer:{
        paddingHorizontal:10,
        marginTop:20,
    },
    footertext:{
        textAlign:'center',
        color:'gray'
    },
    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#794fed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitials: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 15,
  },
});
