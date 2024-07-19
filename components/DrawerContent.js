import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContent({ handleLogout, ...props }) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          const parsedResponse = JSON.parse(storedResponse);
          setUserData(parsedResponse.user);
        } else {
          console.log('No data found in AsyncStorage for key: loginResponse');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  const Logout = () => {
    handleLogout();
  };

  const getInitials = (fullName) => {
    const namesArray = fullName.trim().split(' ');
    if (namesArray.length === 1) return namesArray[0].charAt(0);
    const initials = namesArray[0].charAt(0) + namesArray[namesArray.length - 1].charAt(0);
    return initials.toUpperCase();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitials}>
              {userData ? getInitials(userData.full_name) : ''}
            </Text>
          </View>
          <Title style={styles.title}>{userData ? userData.full_name : ''}</Title>
          <Caption style={styles.caption}>{userData ? userData.email : ''}</Caption>
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
  footer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  footertext: {
    textAlign: 'center',
    color: 'gray',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#6750A6',
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