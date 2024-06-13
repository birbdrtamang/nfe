import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const TakeAttendance = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const hiddenStatuses = ['Z', 'F', 'D', 'ZU']; // Array of statuses to hide the button

  const handler = (learnerName) => {
    navigation.navigate('Update Attendance', { learnerName });
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      autoHide: false,
    });
  };
  const showToast1 = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.ListContainer}>
      <View>
        <Text style={styles.NameText}>{item.learner_name}</Text>
        <Text style={styles.CodeText}>{item.learner_code}</Text>
      </View>
      {/* {(item.status === 'A' || item.status === 'P') && ( */}
      {(item.status === 'A') && (
        <TouchableOpacity style={styles.TakeAttendanceButton} onPress={() => handler(item.learner_name)}>
          <Icon
            source="pencil"
            color={MD3Colors.primary100}
            size={20}
          />
        </TouchableOpacity>
      )}
      {hiddenStatuses.includes(item.status) && (
        <TouchableOpacity style={styles.AttendanceDoneButton} onPress={() => showToast1('success', 'Result Compiled', 'The result is already compiled.')}>
          <Icon
            source="check"
            color="green"
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  // fetch all the learners of the current logged in instructor
  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          const parsedResponse = JSON.parse(storedResponse);
          const instructorId = parsedResponse.user.nfe_center_id; // Retrieve instructor ID

          const response = await fetch(`http://bff.moe.bt/api/nfeapp/getLearnerListForAttendance/${instructorId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch learners');
          }
          const userData = await response.json();

          if (userData.result === "Course is completed") {
            showToast('info', 'Course Completed', 'The course is completed and there are no students assigned.');
          } else {
            setData(userData);
          }

          console.log(userData);

        } else {
          console.log('No data found in AsyncStorage for key: loginResponse');
        }
      } catch (error) {
        console.error('Error fetching learners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  return (
    <View style={styles.Container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.cid_reference_no.toString()}
        />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default TakeAttendance;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
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
  NameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  CodeText: {
    fontSize: 14,
    color: 'gray',
  },
  TakeAttendanceButton: {
    backgroundColor: '#794fed',
    padding: 5,
    marginStart: 8,
    borderRadius: 100,
  },
  AttendanceDoneButton: {
    borderWidth: 1,
    borderColor: '#794fed',
    padding: 5,
    marginStart: 8,
    borderRadius: 100,
  },
  NoDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: '70%',
  },
});
