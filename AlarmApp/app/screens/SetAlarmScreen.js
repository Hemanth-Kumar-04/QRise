import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Switch, 
  Dimensions, 
  Image 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { TimerPicker } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { saveData, getData } from '../../src/storage/mmkvStorage';

const daysArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SetAlarmScreen = ({ navigation }) => {
  const route = useRoute();
  const [selectedTime, setSelectedTime] = useState('08 : 42');
  const [selectedDays, setSelectedDays] = useState({
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
  });
  const [alarmSound, setAlarmSound] = useState('Default');
  const [barcode, setBarcode] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (route.params?.barcode) {
      setBarcode(route.params.barcode);
    }
  }, [route.params?.barcode]);

  const toggleDay = (day) => {
    setSelectedDays({ ...selectedDays, [day]: !selectedDays[day] });
  };

  const scheduleNotification = async (alarmId, scheduledTime) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alarm ringing!',
        body: 'Tap to stop the alarm.',
        sound: alarmSound.toLowerCase(),
        data: { alarmId }
      },
      trigger: scheduledTime,
    });
  };

  const handleSaveAlarm = async () => {
    if (!barcode) {
      Alert.alert('Validation Error', 'Please scan a QR code for the alarm.');
      return;
    }
    const isOneTimeAlarm = Object.values(selectedDays).every(v => !v);
    const newAlarm = {
      id: Date.now(),
      label: label || 'Alarm',
      time: selectedTime,
      days: selectedDays,
      alarmSound,
      barcode,
      snoozeCount: 0,
      oneTime: isOneTimeAlarm,
    };
    const alarms = getData('alarms') || [];
    alarms.push(newAlarm);
    saveData('alarms', alarms);
    Alert.alert('Alarm saved!', isOneTimeAlarm ? 'One-time alarm.' : 'Recurring alarm.');
    const scheduledTime = new Date(Date.now() + 60000);
    await scheduleNotification(newAlarm.id, scheduledTime);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarm</Text>
      <TimerPicker
        padWithNItems={2}
        hideSeconds
        minuteLabel="min"
            hourLabel="hr"
        Audio={Audio}
        LinearGradient={LinearGradient}
        Haptics={Haptics}
        onChange={(timeStr) => setSelectedTime(timeStr)}
        styles={{
          theme: "dark",
          backgroundColor: "transparent",
          pickerItem: { fontSize: 30 },
          pickerLabel: { fontSize: 26, right: 20,left:20 },
          pickerLabelContainer: { width: 60 },
          pickerItemContainer: { width:150 },
        }}
        style={styles.timeWheel}
      />
      <Text style={styles.repeatText}>Repeat</Text>
      <View style={styles.daysContainer}>
        {daysArray.map((day) => {
          const isSelected = selectedDays[day] === true;
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                {day[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.scanTuneContainer}>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('BarcodeScanner')}>
          <Image source={require('../../assets/images/addicon.png')} style={styles.qrIcon} />
          <Text style={styles.scanText}>Scan QR</Text>
        </TouchableOpacity>
        <View style={styles.tuneContainer}>
          <Text style={styles.tuneLabel}>Choose The Tune</Text>
          <TouchableOpacity style={styles.tunePicker}>
            <Text style={styles.tunePickerText}>{alarmSound}</Text>
            <Image source={require('../../assets/images/addicon.png')} style={styles.downIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.setAlarmButton} onPress={handleSaveAlarm}>
        <Text style={styles.setAlarmText}>Set Alarm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetAlarmScreen;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141D2A',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    color: '#FFFFFFCC',
    textAlign: 'center',
    marginBottom: 25,
  },
  timeWheel: {
    alignSelf: 'center',
    backgroundColor: '#2D3440',
    borderRadius: 10,
    marginBottom: 15,
  },
  repeatText: {
    color: '#FFFFFFCC',
    marginTop:'7.5%',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D3440',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleSelected: {
    backgroundColor: '#08D69733',
  },
  dayText: {
    color: '#FFFFFF99',
    fontSize: 16,
  },
  dayTextSelected: {
    color: '#08D697',
  },
  scanTuneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  scanButton: {
    alignItems: 'center',
  },
  qrIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    tintColor: '#FFFFFF99',
  },
  scanText: {
    color: '#FFFFFF99',
    fontSize: 18,
  },
  tuneContainer: {
    alignItems: 'center',
  },
  tuneLabel: {
    color: '#FFFFFF99',
    fontSize: 17,
    marginBottom: 5,
  },
  tunePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3440',
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tunePickerText: {
    color: '#FFFFFF99',
    fontSize: 16,
    marginRight: 10,
  },
  downIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF99',
  },
  setAlarmButton: {
    marginTop: '20%',
    alignSelf: 'center',
    backgroundColor: '#7568EB',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  setAlarmText: {
    color: '#FFFFFF95',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
