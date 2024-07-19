import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateMonthYearRange = (startMonth, startYear, endMonth, endYear) => {
  const range = [];
  let currentYear = startYear;
  let currentMonthIndex = months.indexOf(startMonth);

  while (currentYear < endYear || (currentYear === endYear && currentMonthIndex <= months.indexOf(endMonth))) {
    range.push(`${months[currentMonthIndex]} ${currentYear}`);
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentMonthIndex = 0;
      currentYear++;
    }
  }

  return range;
};

const MonthPicker = ({ onSelect, visible, onClose, monthYearRange }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

  const handleMonthYearSelect = (monthYear) => {
    setSelectedMonthYear(monthYear);
    onSelect(monthYear);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select a Month and Year</Text>
          <ScrollView style={styles.scrollView}>
            {monthYearRange.map((monthYear, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.monthButton,
                  selectedMonthYear === monthYear && styles.selectedMonthButton
                ]}
                onPress={() => handleMonthYearSelect(monthYear)}
              >
                <Text style={styles.monthText}>{monthYear}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const UpdateAttendanceForm = ({ route }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [monthYearRange, setMonthYearRange] = useState([]);
  const [monthYearIdMap, setMonthYearIdMap] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [instructorId, setInstructorId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { learnerName } = route.params;

  useEffect(() => {
    const fetchInstructorId = async () => {
      try {
        const storedResponse = await AsyncStorage.getItem('loginResponse');
        if (storedResponse !== null) {
          const parsedResponse = JSON.parse(storedResponse);
          const id = parsedResponse.user.staff_id;
          setInstructorId(id);
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    fetchInstructorId();
  }, []);

  useEffect(() => {
    const fetchCentreDetailsAndDateRange = async () => {
      if (instructorId) {
        try {
          setLoading(true);
          const profileResponse = await axios.get(`http://bff.moe.bt/api/nfeapp/mobileappgetinstructorprofile/${instructorId}`);
          const { centre_id, centre_details_id } = profileResponse.data;

          const dateRangeResponse = await axios.get(`http://bff.moe.bt/api/nfeapp/getCourseDateRangeByCentreIdByCentreDetailId/${centre_id}/${centre_details_id}`);
          const attendanceData = dateRangeResponse.data;

          const startMonth = attendanceData[0].attendance_month;
          const startYear = attendanceData[0].attendance_year;
          const endMonth = attendanceData[attendanceData.length - 1].attendance_month;
          const endYear = attendanceData[attendanceData.length - 1].attendance_year;

          const range = generateMonthYearRange(startMonth, startYear, endMonth, endYear);
          const idMap = {};
          attendanceData.forEach(item => {
            const key = `${item.attendance_month} ${item.attendance_year}`;
            idMap[key] = item.id;
          });

          setMonthYearRange(range);
          setMonthYearIdMap(idMap);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    fetchCentreDetailsAndDateRange();
  }, [instructorId]);

  const handleMonthYearSelect = (monthYear) => {
    setSelectedMonthYear(monthYear);
    setSelectedId(monthYearIdMap[monthYear]);
    setShowPicker(false);
  };

  const handleTotalPresentChange = (text) => {
    if (!selectedMonthYear) {
      Toast.show({
        type: 'error',
        text1: 'Please select a month and year first.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    const presentDays = parseInt(text) || 0;
    const [selectedMonth, selectedYear] = selectedMonthYear.split(' ');
    const selectedDate = new Date(parseInt(selectedYear), months.indexOf(selectedMonth));
    const totalDaysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

    if (presentDays > totalDaysInMonth) {
      Toast.show({
        type: 'error',
        text1: `Total present days cannot exceed total days in ${selectedMonth}`,
        visibilityTime: 3000,
        autoHide: true,
      });
    } else if (presentDays < 0) {
      Toast.show({
        type: 'error',
        text1: 'Total present days cannot be negative.',
      });
    } else {
      setTotalPresentDays(presentDays);
      setTotalAbsentDays(totalDaysInMonth - presentDays);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        instructor_id: instructorId,
        learner_name: learnerName,
        month_year_id: selectedId,
        present_days: totalPresentDays,
        absent_days: totalAbsentDays,
      };
      const response = await axios.post('http://yourapiurl.com/updateAttendance', payload);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Attendance updated successfully!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update attendance.',
      });
      console.error('Error updating attendance:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Attendance For <Text style={styles.learnerName}>{learnerName}</Text></Text>
      <MonthPicker
        visible={showPicker}
        onSelect={handleMonthYearSelect}
        onClose={() => setShowPicker(false)}
        monthYearRange={monthYearRange}
      />
      <TextInput
        mode="outlined"
        label="Select Month and Year"
        editable={false}
        placeholder="Select Month and Year"
        value={selectedMonthYear}
        right={<TextInput.Icon onPress={() => setShowPicker(true)} icon="calendar" />}
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label="Total Present Days"
        style={styles.textInput}
        onChangeText={handleTotalPresentChange}
        editable={!!selectedMonthYear} // Disable input if no month and year is selected
      />
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label="Total Absent Days"
        value={totalAbsentDays.toString()}
        style={styles.textInput}
        editable={false}
      />
      <Button
        style={styles.button}
        icon="update"
        mode="contained"
        onPress={handleSubmit}
        disabled={!selectedMonthYear} // Disable button if no month and year is selected
      >
        Update Attendance
      </Button>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  learnerName: {
    color: 'blue',
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: 300,
  },
  monthButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMonthButton: {
    backgroundColor: '#e0e0e0',
  },
  monthText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default UpdateAttendanceForm;
