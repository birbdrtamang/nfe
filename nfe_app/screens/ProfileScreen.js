import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Get initials from full name
const getInitials = (fullName) => {
  if (!fullName) return '';  // Add a check to return an empty string if fullName is undefined
  const namesArray = fullName.trim().split(' ');
  if (namesArray.length === 1) return namesArray[0].charAt(0);
  const initials = namesArray[0].charAt(0) + namesArray[namesArray.length - 1].charAt(0);
  return initials.toUpperCase();
};

const FirstRoute = ({ userData }) => (
  <View style={styles.tabContainer}>
    <View style={styles.textContainer}>
      <Icon name="phone" color="#777777" size={20} />
      <View style={styles.info}>
        <Text style={styles.label}>+975 {userData.contact_no}</Text>
        <Caption style={styles.caption}>Phone Number</Caption>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Icon name="phone" color="#777777" size={20} />
      <View style={styles.info}>
        <Text style={styles.label}>{userData.cid_no}</Text>
        <Caption style={styles.caption}>Phone Number</Caption>
      </View>
    </View>
  </View>
);

const SecondRoute = ({ email }) => (
  <View style={styles.tabContainer}>
    <View style={styles.textContainer}>
      <Icon name="email" color="#777777" size={20} />
      <View style={styles.info}>
        <Text style={styles.label}>{email}</Text>
        <Caption style={styles.caption}>Email Address</Caption>
      </View>
    </View>
  </View>
);

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'phone', title: 'Personal Info' },
    { key: 'email', title: 'Center Info' },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          const parsedResponse = JSON.parse(storedResponse);
          const instructorId = parsedResponse.user.staff_id; // Retrieve instructor ID
          const apiUrl = `http://bff.moe.bt/api/nfeapp/mobileappgetinstructorprofile/${instructorId}`;
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setUserData(userData);
          console.log(userData);
        } else {
          console.log('No data found in AsyncStorage for key: loginResponse');
        }
      } catch (error) {
        setError('Error retrieving data from API');
        console.error('Error retrieving data from API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'phone':
        return <FirstRoute userData={userData} />;
      case 'email':
        return <SecondRoute email={userData.email} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  const initials = getInitials(userData.instructor_name);

  return (
    <View style={styles.container}>
      <View style={styles.initialContainer}>
        <View style={styles.initial}>
          <Text style={styles.initialText}>{initials}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.name}>{userData.instructor_name}</Text>
          <Text style={styles.role}>{userData.email}</Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  initialContainer: {
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  initial: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 40,
  },
  initialText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 25,
  },
  usernameContainer: {
    marginLeft: 20,
  },
  name: {
    color: '#333',
    fontWeight: '600',
    fontSize: 20,
  },
  role: {
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  info: {
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    color: '#333',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'grey',
  },
});

export default ProfileScreen;
