import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const AlarmRingingScreen = ({ navigation }) => {
  const [snoozeCount, setSnoozeCount] = useState(0);

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
      <Text style={styles.alarmText}>Alarm Ringing!</Text>
      <Button title="Snooze (10 mins)" onPress={handleSnooze} disabled={snoozeCount >= 3} />
      <Button title="Stop Alarm" onPress={handleStop} />
    </View>
  );
};

export default AlarmRingingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmText: {
    fontSize: 28,
    marginBottom: 20,
  },
});
