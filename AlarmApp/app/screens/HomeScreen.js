import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getData } from '../../src/storage/mmkvStorage';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    // Retrieve user and alarms from local storage
    const storedUser = getData('user');
    const storedAlarms = getData('alarms') || [];
    setUser(storedUser);
    setAlarms(storedAlarms);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user ? user.name : 'User'}!</Text>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.time} - {item.label}</Text>}
        ListEmptyComponent={<Text>No alarms set.</Text>}
      />
      <Button title="Set New Alarm" onPress={() => navigation.navigate('SetAlarm')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  welcome: { fontSize: 20, marginBottom: 20 }
});
