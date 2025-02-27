import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const AlarmRingingScreen = ({ navigation }) => {
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { day: '2-digit', month: 'short', weekday: 'long' }) + (date.getHours() >= 12 ? ' pm' : ' am');
  };

  const handleSnooze = () => {
    if (snoozeCount < 3) {
      setSnoozeCount(snoozeCount + 1);
      Alert.alert('Snoozed', 'Alarm snoozed for 10 minutes');
    } else {
      Alert.alert('Snooze Limit Reached', 'Please scan the barcode to stop the alarm.');
    }
  };

  const handleStop = () => {
    navigation.navigate('BarcodeScanner');
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: '25%' ,marginTop:"-70%"}}>

      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.snoozeButton, snoozeCount >= 3 && styles.disabledButton]} 
        onPress={handleSnooze} 
        disabled={snoozeCount >= 3}>
        <Text style={styles.snoozeText}>🔔 Snooze for 10 mins</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stopArea} onPress={handleStop}>
        <Text style={styles.stopText}> Tap to stop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlarmRingingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141D2A',
  },
  timeText: {
    fontSize: 64,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF90',
    marginBottom: 40,
  },
  snoozeButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.5,
  },
  snoozeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  stopArea: {
    padding:'23%',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  stopText: {
    fontSize: 14,
    color: '#FFFFFF90',
  },
});
