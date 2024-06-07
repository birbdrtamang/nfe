import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { TextInput, Button, D3Colors, MD2Colors } from 'react-native-paper';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

const UpdateAttendanceForm = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowPicker(false); // Close the month picker modal after selection
  };

  const handleTotalPresentChange = (text) => {
    const presentDays = parseInt(text) || 0;
    // Get the total days for the selected month dynamically based on the current year
    const selectedDate = new Date();
    const year = selectedDate.getFullYear();
    const monthIndex = months.findIndex((m) => m === selectedMonth);
    const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // Validate if presentDays exceed total days in the month or are negative
    if (presentDays > totalDaysInMonth) {
      // If presentDays exceed total days, display an error message and don't update the state
      alert(`Total present days cannot exceed total days in ${selectedMonth}`);
    } else if (presentDays < 0) {
      // If presentDays are negative, display an error message and don't update the state
      alert(`Total present days cannot be negative.`);
    } else {
      // Otherwise, update the state with the entered value
      setTotalPresentDays(presentDays);
    }
  
    // Calculate total absent days based on total days in the month and total present days
    const absentDays = totalDaysInMonth - presentDays;
    console.log('total present days: ',presentDays);
    setTotalAbsentDays(absentDays);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Update Attendance For Kinga Penjor</Text>
      {/* Month Picker */}
      <MonthPicker
        visible={showPicker}
        onSelect={handleMonthSelect}
        onClose={() => setShowPicker(false)}
      />
      <TextInput
        mode="outlined"
        label="Select Month"
        editable={false}
        placeholder="Select Month"
        value={selectedMonth} 
        // onTouchStart={() => setShowPicker(true)} 
        right={<TextInput.Icon   onPress={() => setShowPicker(true)}  icon="calendar"  />}
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
        editable={false} // Make it read-only
      />
      <Button
        style={styles.button}
        icon="update"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Update Attendance
      </Button>
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
    fontWeight:'500',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius:5,
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  monthButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'start',
    backgroundColor:'#794fed16',
    marginBottom:5,
    paddingHorizontal:10,
    borderRadius:2,
  },
  selectedMonthButton: {
    backgroundColor: '#794fedc1',
    color:'#fff',
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
});

export default UpdateAttendanceForm;
