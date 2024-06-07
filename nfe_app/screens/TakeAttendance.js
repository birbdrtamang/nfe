import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TakeAttendance = () => {
  const navigation = useNavigation();
  const handler = () =>{
    navigation.navigate('Update Attendance')
  }
  // Define your data array
  const data = [
    { id: 111112, name: 'Sonam Wangchuk' },
    { id: 121121, name: 'Sonam Wangchuk' },
    { id: 131121, name: 'Sonam Wangchuk' },
    { id: 151121, name: 'Sonam Wangchuk' },
    { id: 119121, name: 'Sonam Wangchuk' },
    { id: 211212, name: 'Sonam Wangchuk' },
    { id: 3111212, name: 'Sonam Wangchuk' },
    { id: 4134411, name: 'Sonam Wangchuk' },
    { id: 1631111, name: 'Sonam Wangchuk' },
    { id: 2111133, name: 'Sonam Wangchuk' },
    { id: 31212312, name: 'Sonam Wangchuk' },
    { id: 4112123, name: 'Sonam Wangchuk' },
  ];

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.ListContainer}>
      <Text>{item.name}</Text>
      <TouchableOpacity style={styles.TakeAttendanceButton} onPress={handler}>
        <Icon
          source="pencil"
          color={MD3Colors.primary100}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.Container}>
      {/* <Text style={styles.TextHeader}>Update my student's attendance</Text> */}
      {/* Use FlatList to render the list */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TakeAttendance;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom:10,
  },
  TextHeader: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '900',
  },
  ListContainer: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.158)',
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  TakeAttendanceButton: {
    backgroundColor: '#794fed',
    padding: 5,
    marginStart: 8,
    borderRadius: 100,
  },
});
