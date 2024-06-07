// src/screens/Login.js
import React, {useState} from 'react';
import { View, Text, StyleSheet, Image,Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import Login_button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  // Response 
  const [loginResponse, setLoginResponse] = useState(null);

  const handleEmailChange = (text) => {
    setEmail(text);
    // console.log(email)
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // console.log(password)
  };

  const handleLogin = async () => {
    if(email === '' || password === ''){
      Alert.alert('Alert!','Please enter your credentials.')
      return
    }
    try {
      const response = await fetch('http://bff.moe.bt/api/nfeapp/nfeapplogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.access_token && data.user && data.roles) {
        console.log('Login successful:', data);

        await AsyncStorage.setItem('loginResponse', JSON.stringify(data));
        onLogin()
        
      } else {
        console.log('Invalid credentials:', data);
        Alert.alert('Error', data.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue with Bhutan NFE.</Text>
      
        {/* <Input/> */}
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Email Address"
          placeholder="Email"
          onChangeText={handleEmailChange}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={passwordVisible}
          mode="outlined"
          label="Password"
          placeholder="Password"
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          onChangeText={handlePasswordChange}
          value={password}
        />
        <Login_button onPress={handleLogin}/>

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
    width: '100%',
    objectFit:'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input:{
    marginBottom:15
  }
});

export default Login;
