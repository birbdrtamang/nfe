import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TakeAttendance = () => {
  const navigation = useNavigation();
  const handler = () => {
    navigation.navigate('Update Attendance');
  }

  // Define your data array
  const data = [
    { learner_name: 'Tobgyal', cid_reference_no: '11603002274', learner_code: '202201991', status: 'A' },
    { learner_name: 'Phuntsho Wangmo', cid_reference_no: '11603001368', learner_code: '202201992', status: 'Z' },
    { learner_name: 'Karma Choden', cid_reference_no: '11603004292', learner_code: '202201993', status: 'A' },
    { learner_name: 'Tshering Yuden', cid_reference_no: '11603001979', learner_code: '202201994', status: 'Z' },
    { learner_name: 'Sonam Choden', cid_reference_no: '11603002032', learner_code: '202201995', status: 'Z' },
    { learner_name: 'Tashi Dema', cid_reference_no: '11603001565', learner_code: '202201996', status: 'Z' },
    { learner_name: 'Tshering Dema', cid_reference_no: '11603004294', learner_code: '202201997', status: 'Z' },
    { learner_name: 'Tshegaymo', cid_reference_no: '11603002306', learner_code: '202201998', status: 'Z' },
    { learner_name: 'Yangchen', cid_reference_no: '11603001323', learner_code: '202201999', status: 'A' },
    { learner_name: 'Sithar Wangmo', cid_reference_no: '11603001401', learner_code: '202202000', status: 'Z' },
    { learner_name: 'Dema', cid_reference_no: '11603002316', learner_code: '202202001', status: 'Z' },
    { learner_name: 'Dorji', cid_reference_no: '11603001361', learner_code: '202202002', status: 'Z' },
    { learner_name: 'Kelzang Choden', cid_reference_no: '11603001396', learner_code: '202202003', status: 'Z' },
  ];

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.ListContainer}>
      <View>
        <Text style={styles.NameText}>{item.learner_name}</Text>
        <Text style={styles.CodeText}>{item.learner_code}</Text>
      </View>
      {item.status === 'A' && (
        <TouchableOpacity style={styles.TakeAttendanceButton} onPress={handler}>
          <Icon
            source="pencil"
            color={MD3Colors.primary100}
            size={20}
          />
        </TouchableOpacity>
      )}
      {item.status === 'Z' && (
        <TouchableOpacity style={styles.AttendanceDoneButton}>
          <Icon
            source="check"
            color="green"
            size={20}
          />
        </TouchableOpacity>

      )}
    </View>
  );

  return (
    <View style={styles.Container}>
      {/* <Text style={styles.TextHeader}>Update my student's attendance</Text> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.cid_reference_no.toString()}
      />
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
});
