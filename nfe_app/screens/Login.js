import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import LoginButton from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your credentials.',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://bff.moe.bt/api/nfeapp/nfeapplogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.access_token && data.user && data.roles) {
        console.log('Login successful:', data);

        await AsyncStorage.setItem('loginResponse', JSON.stringify(data));
        onLogin();

        // Show success toast message
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You have successfully logged in.',
        });
      } else {
        console.log('Invalid credentials:', data);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.status,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while logging in. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/nfelogo-modified.png')} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter Your Credentials To Continue</Text>
      
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email Address"
        onChangeText={handleEmailChange}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={passwordVisible}
        mode="outlined"
        label="Password"
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        onChangeText={handlePasswordChange}
        value={password}
      />
      <LoginButton onPress={handleLogin} loading={loading} />

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '60%',
    objectFit: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
});

export default Login;
