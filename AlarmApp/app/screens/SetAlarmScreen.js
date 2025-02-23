import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Switch, StyleSheet, Alert } from 'react-native';
import { saveData, getData } from '../../src/storage/mmkvStorage';
import * as Notifications from 'expo-notifications';
import { useRoute } from '@react-navigation/native';

const SetAlarmScreen = ({ navigation }) => {
  const [label, setLabel] = useState('');
  const [time, setTime] = useState('07:00');
  const [amPm, setAmPm] = useState('AM');
  const [selectedDays, setSelectedDays] = useState({
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
  });
  const [alarmSound, setAlarmSound] = useState('default1.mp3'); // choose from 3 default sounds
  const [barcode, setBarcode] = useState('');

  // Retrieve the scanned barcode from navigation params (from BarcodeScanner)
  const route = useRoute();
  useEffect(() => {
    if (route.params?.barcode) {
      setBarcode(route.params.barcode);
    }
  }, [route.params?.barcode]);

  const toggleDay = (day) => {
    setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] });
  };

  // Function to schedule a notification; here we demo a 1-minute delay.
  const scheduleNotification = async (alarmId, scheduledTime) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alarm ringing!',
        body: 'Tap to stop the alarm.',
        sound: alarmSound,
        data: { alarmId }
      },
      trigger: scheduledTime,
    });
  };

  // Check if no day is selected
  const isOneTimeAlarm = Object.values(selectedDays).every((selected) => !selected);

  // Validate required fields and handle edge cases
  const handleSaveAlarm = () => {
    if (!label.trim()) {
      Alert.alert('Validation Error', 'Please enter an alarm label.');
      return;
    }
    if (!barcode) {
      Alert.alert('Validation Error', 'Please scan a QR code for the alarm.');
      return;
    }

    // If no days are selected, confirm with the user for a one-time alarm.
    if (isOneTimeAlarm) {
      Alert.alert(
        'No Days Selected',
        'No days have been selected, which means this will be a one-time alarm. Do you want to proceed?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => saveAlarm(true) },
        ]
      );
    } else {
      saveAlarm(false);
    }
  };

  // Save the alarm data and schedule notification(s)
  const saveAlarm = async (oneTime) => {
    let alarms = getData('alarms') || [];
    const newAlarm = {
      id: Date.now(),
      label,
      time: `${time} ${amPm}`,
      days: selectedDays,
      alarmSound,
      barcode, // store barcode with alarm
      snoozeCount: 0,
      oneTime, // flag to indicate one-time alarm
    };
    alarms.push(newAlarm);
    saveData('alarms', alarms);
    Alert.alert('Alarm saved!', oneTime ? 'This is a one-time alarm.' : 'This is a recurring alarm.');

    // For demonstration, schedule a notification 1 minute from now.
    // In a full implementation, calculate scheduledTime based on the alarm time and recurrence.
    const scheduledTime = new Date(Date.now() + 60000);
    await scheduleNotification(newAlarm.id, scheduledTime);

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Alarm</Text>
      <TextInput
        placeholder="Alarm Label"
        value={label}
        onChangeText={setLabel}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (e.g., 07:00)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <View style={styles.row}>
        <Text>{amPm}</Text>
        <Switch
          value={amPm === 'AM'}
          onValueChange={(val) => setAmPm(val ? 'AM' : 'PM')}
        />
      </View>
      <Text style={styles.subtitle}>Select Days:</Text>
      {Object.keys(selectedDays).map((day) => (
        <View key={day} style={styles.row}>
          <Text>{day}</Text>
          <Switch value={selectedDays[day]} onValueChange={() => toggleDay(day)} />
        </View>
      ))}
      {/* Button to launch the QR code scanner */}
      <Button title="Scan QR Code" onPress={() => navigation.navigate('BarcodeScanner')} />
      {barcode ? <Text style={styles.barcodeText}>Scanned Barcode: {barcode}</Text> : null}
      <Text style={styles.subtitle}>Alarm Sound: {alarmSound}</Text>
      {/* Optionally, integrate a sound picker */}
      <Button title="Save Alarm" onPress={handleSaveAlarm} />
    </View>
  );
};

export default SetAlarmScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 15 },
  barcodeText: { fontSize: 16, marginVertical: 10, color: 'green' }
});
