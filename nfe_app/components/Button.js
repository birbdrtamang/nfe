import React from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const LoginButton = ({ onPress, loading }) => (
  <Button
    mode="contained"
    onPress={onPress}
    style={styles.button}
    contentStyle={styles.buttonContent}
    labelStyle={styles.buttonLabel}
    loading={loading}
    disabled={loading}
  >
    Sign In
    {/* {loading ? <ActivityIndicator color="#fff" /> : 'Sign In'} */}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default LoginButton;
