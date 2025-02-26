import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Switch 
} from 'react-native';
import { getData, saveData } from '../../src/storage/mmkvStorage';

const alarmColors = ['#796BF8', '#1FC176', '#EA7A55', '#7DACC1'];

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    // Retrieve user and alarms from local storage
    const storedUser = getData('user');
    const storedAlarms = getData('alarms') || [];
    setUser(storedUser);
    // Ensure each alarm has an 'enabled' property; default true if not present.
    const updatedAlarms = storedAlarms.map(alarm => ({
      ...alarm,
      enabled: alarm.enabled !== undefined ? alarm.enabled : true,
    }));
    setAlarms(updatedAlarms);
  }, []);

  const toggleAlarm = (alarmId) => {
    const updatedAlarms = alarms.map(alarm => {
      if (alarm.id === alarmId) {
        return { ...alarm, enabled: !alarm.enabled };
      }
      return alarm;
    });
    setAlarms(updatedAlarms);
    saveData('alarms', updatedAlarms);
  };

  const renderAlarmBox = ({ item, index }) => {
    const backgroundColor = alarmColors[index % alarmColors.length];
    return (
      <View style={[styles.alarmBox, { backgroundColor }]}>
        <Text style={styles.alarmTime}>{item.time}</Text>
        <Text style={styles.alarmLabel}>{item.label}</Text>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleAlarm(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Greeting */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user ? user.name : 'User'}!</Text>
      </View>
      
      {/* Alarm Boxes Grid */}
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAlarmBox}
        ListEmptyComponent={<Text style={styles.emptyText}>No alarms set.</Text>}
        contentContainerStyle={styles.alarmList}
        numColumns={2}
      />
      
      {/* Add Alarm Button (Image) */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('SetAlarm')}
      >
        <Image 
          source={require('../../assets/images/addicon.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SetAlarm')}>
          <Text style={styles.navText}>Add Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#141D2A', 
    padding: 20 
  },
  header: { 
    marginBottom: 20 
  },
  greeting: { 
    fontSize: 40, 
    color: '#FFFFFF95' 
  },
  alarmList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmBox: {
    flexGrow:1,
    minWidth: '90%',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  alarmTime: { 
    fontSize: 24, 
    color: '#fff', 
    marginBottom: 5 
  },
  alarmLabel: { 
    fontSize: 18, 
    color: '#fff', 
    marginBottom: 10 
  },
  emptyText: { 
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center' 
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 80,
    backgroundColor: '#1FC176',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  addIcon: { 
    width: 40, 
    height: 40, 
    tintColor: '#fff' 
  },
  navBar: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#141D2A',
  },
  navText: { 
    color: '#fff', 
    fontSize: 16 
  },
});
