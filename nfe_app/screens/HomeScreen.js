import React from 'react';
import {  View, Text,Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/kings.jpg')}
        style={styles.headerImage}
      >
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText1}>~ NFE ~</Text>
          <Text style={styles.headerText}>The Light That Ignites Hope</Text>
        </View>
      </ImageBackground>
      <View style={styles.gridContainer}>
        
          <TouchableOpacity style={styles.gridItem}  onPress={() => navigation.navigate('Take Attendance')}>
            <ImageBackground style={styles.gridItemImg} source={require('../assets/attendance.jpg')}>
              <View style={styles.glass}>
                <Text>Take Attendance</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

        
        <TouchableOpacity style={styles.gridItem}>
          <View style={styles.placeholder}>
            {/* <Icon name="account-check-outline" size={50}/> */}
            <Image source={require('../assets/lecture.png')} style={styles.image}/>
            <Text>Today's Lecture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <View style={styles.placeholder}>
            <Icon name="account-check-outline" size={50}/>
            <Text>Assignments</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <View style={styles.placeholder}>
            <Icon name="-check-outline" size={50}/>
            <Text>Marks</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image:{
    height:70,
    width:70
  },
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    height: 150,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  headerText1:{
    color: 'white',
    fontSize: 25,
    fontWeight:'bold',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:20,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius:10
    // borderWidth:1
  },
  gridItemImg: {
    width: '100%',
    height:'100%',
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,    
  },
  glass:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:'100%',
    height:'100%',
    borderRadius:10
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default HomeScreen;
