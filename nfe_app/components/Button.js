import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const LoginButton = ({onPress}) => (
  <View style={styles.container}>
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.button}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      // loading={true}
    >
      Sign In
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  button: {
    width: '100%', // Adjust the width as needed
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8, // Vertical padding inside the button
  },
  buttonLabel: {
    fontSize: 18, // Font size of the button text
  },
});

export default LoginButton;
