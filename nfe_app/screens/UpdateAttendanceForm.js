import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message'; // Import Toast from react-native-toast-message

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 51 }, (_, index) => currentYear - 25 + index);

const MonthPicker = ({ onSelect, visible, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    onSelect(month);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select a Month</Text>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.monthButton,
                selectedMonth === month && styles.selectedMonthButton
              ]}
              onPress={() => handleMonthSelect(month)}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const YearPicker = ({ onSelect, visible, onClose }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    onSelect(year);
    onClose();
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select a Year</Text>
          <ScrollView style={styles.scrollView}>
            {years.map((year, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.monthButton,
                  selectedYear === year && styles.selectedMonthButton
                ]}
                onPress={() => handleYearSelect(year)}
              >
                <Text style={styles.monthText}>{year}</Text>
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
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const { learnerName } = route.params;

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowPicker(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowYearPicker(false);
  };

  const handleTotalPresentChange = (text) => {
    const presentDays = parseInt(text) || 0;
    const selectedDate = new Date(selectedYear, months.findIndex((m) => m === selectedMonth));
    const totalDaysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

    if (presentDays > totalDaysInMonth) {
    Toast.show({
      type: 'error',
      text1: `Total present days cannot exceed total days in ${selectedMonth}`,
      visibilityTime: 3000, // Optional duration in milliseconds
      autoHide: true, // Auto hide the toast after visibilityTime
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Attendance For <Text style={styles.learnerName}>{learnerName}</Text></Text>
      <YearPicker
        visible={showYearPicker}
        onSelect={handleYearSelect}
        onClose={() => setShowYearPicker(false)}
      />
      <MonthPicker
        visible={showPicker}
        onSelect={handleMonthSelect}
        onClose={() => setShowPicker(false)}
      />
      <TextInput
        mode="outlined"
        label="Select Year"
        editable={false}
        placeholder="Select Year"
        value={selectedYear ? selectedYear.toString() : ''}
        right={<TextInput.Icon onPress={() => setShowYearPicker(true)} icon="calendar" />}
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        label="Select Month"
        editable={false}
        placeholder="Select Month"
        value={selectedMonth}
        right={<TextInput.Icon onPress={() => setShowPicker(true)} icon="calendar" />}
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label="Total Present Days"
        style={styles.textInput}
        onChangeText={handleTotalPresentChange}
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
        onPress={() => console.log('Pressed')}
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
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  scrollView: {
    width: '100%',
  },
  monthButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#794fed16',
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  selectedMonthButton: {
    backgroundColor: '#794fedc1',
  },
  monthText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  learnerName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
});

export default UpdateAttendanceForm;
