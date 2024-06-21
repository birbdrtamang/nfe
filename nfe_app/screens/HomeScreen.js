import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: windowWidth } = Dimensions.get('window');

const carouselImages = [
  require('../assets/herobanner.jpeg'),
  require('../assets/herobanner.jpeg'),
  require('../assets/herobanner.jpeg'),
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={windowWidth}
          height={200}
          autoPlay={true}
          data={carouselImages}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <ImageBackground
              source={carouselImages[index]}
              style={styles.headerImage}
              resizeMode="cover"
            >
              {/* You can add content over the ImageBackground here */}
            </ImageBackground>
          )}
        />
      </View>

      <View style={styles.about}>
        <View style={styles.paraContainer}>
          <Text style={styles.header}>About NFE</Text>
          <Text style={styles.para}>
            Non-Formal Education Program is an educational activity which is targeted at providing functional literacy and numeracy skills to youth and adults who have missed the formal education system.
          </Text>
        </View>
        <Image source={require('../assets/about.jpg')} style={styles.aboutImage} />
      </View>

      <View style={styles.gridContainer}>

        <TouchableOpacity style={[styles.gridItem, styles.shadow]} onPress={() => navigation.navigate('Take Attendance')}>
          <View style={styles.placeholder}>
            <Image source={require('../assets/takeattendance.jpeg')} style={styles.image} />
            <Text style={styles.itemName}>Take Attendance</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, styles.shadow]}>
          <View style={styles.placeholder}>
            <Image source={require('../assets/lecture.png')} style={styles.image} />
            <Text style={styles.itemName}>Monitory Tool</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, styles.shadow]}>
          <View style={styles.placeholder}>
            <Image source={require('../assets/lecture.png')} style={styles.image} />
            <Text style={styles.itemName}>Assignments</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, styles.shadow]}>
          <View style={styles.placeholder}>
            <Image source={require('../assets/lecture.png')} style={styles.image} />
            <Text style={styles.itemName}>Marks</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  carouselContainer: {
    height: 220,
  },
  headerImage: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  about: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6750A6',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  paraContainer: {
    width: '50%',
    height: '100%',
  },
  para: {
    fontSize: 11,
    color: '#fff',
  },
  aboutImage: {
    height: '80%',
    width: '40%',
  },
  header: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    fontSize: 14,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#8f76cc',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
  },
  itemName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

export default HomeScreen;