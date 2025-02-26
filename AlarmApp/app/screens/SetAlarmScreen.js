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
import { saveData, getData } from '../../src/storage/mmkvStorage';

const mockTimes = ['06 : 20', '07 : 20', '08 : 42', '09 : 20', '10 : 20']; // Example times
const daysArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const SetAlarmScreen = ({ navigation }) => {
  const route = useRoute();
  const [selectedTime, setSelectedTime] = useState('08 : 42');
  const [amPm, setAmPm] = useState('AM');
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
        sound: alarmSound.toLowerCase(), // or map to an actual sound file
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
      time: `${selectedTime} ${amPm}`,
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
      
      {/* Time Selector */}
      <View style={styles.timesContainer}>
        {mockTimes.map((t) => {
          const isSelected = t === selectedTime;
          return (
            <TouchableOpacity
              key={t}
              style={[styles.timeButton, isSelected && styles.timeButtonSelected]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* AM / PM Toggle */}
      <View style={styles.amPmContainer}>
        <TouchableOpacity
          style={[styles.amPmButton, amPm === 'AM' && styles.amPmSelected]}
          onPress={() => setAmPm('AM')}
        >
          <Text style={[styles.amPmText, amPm === 'AM' && styles.amPmTextSelected]}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.amPmButton, amPm === 'PM' && styles.amPmSelected]}
          onPress={() => setAmPm('PM')}
        >
          <Text style={[styles.amPmText, amPm === 'PM' && styles.amPmTextSelected]}>PM</Text>
        </TouchableOpacity>
      </View>

      {/* Repeat Days */}
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

      {/* Scan QR & Tune */}
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

      {/* Set Alarm Button */}
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
    backgroundColor: '#1E2530',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFFCC',
    textAlign: 'center',
    marginBottom: 25,
  },
  timesContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginBottom: 15,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2D3440',
  },
  timeButtonSelected: {
    backgroundColor: '#08D69733',
  },
  timeText: {
    fontSize: 28,
    color: '#FFFFFF99',
  },
  timeTextSelected: {
    color: '#08D697',
  },
  amPmContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  amPmButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#2D3440',
  },
  amPmSelected: {
    backgroundColor: '#08D69733',
  },
  amPmText: {
    fontSize: 18,
    color: '#FFFFFF99',
  },
  amPmTextSelected: {
    color: '#08D697',
  },
  repeatText: {
    color: '#FFFFFFCC',
    fontSize: 18,
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
    fontSize: 14,
  },
  tuneContainer: {
    alignItems: 'center',
  },
  tuneLabel: {
    color: '#FFFFFF99',
    fontSize: 14,
    marginBottom: 5,
  },
  tunePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3440',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tunePickerText: {
    color: '#FFFFFF99',
    fontSize: 14,
    marginRight: 10,
  },
  downIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF99',
  },
  setAlarmButton: {
    alignSelf: 'center',
    backgroundColor: '#08D697',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  setAlarmText: {
    color: '#1E2530',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
