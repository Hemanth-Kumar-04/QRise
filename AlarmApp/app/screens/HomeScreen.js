import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image,  
  TouchableOpacity, 
  Switch,
  Dimensions
} from 'react-native';
import { getData, saveData } from '../../src/storage/mmkvStorage';

const alarmColors = ['#796BF8', '#1FC176', '#EA7A55', '#7DACC1'];

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const storedUser = getData('user');
    const storedAlarms = getData('alarms') || [];
    setUser(storedUser);
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


      <TouchableOpacity 
        style={[styles.alarmBox, { backgroundColor }]}
        onPress={() => navigation.navigate('SetAlarm', { alarm: item })} // navigate to edit screen
        >
        <View style={styles.alarmLeft}>
          <Text style={styles.alarmTime}>{item.time}</Text>
         
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleAlarm(item.id)}
          />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome,</Text>
        <Text style={styles.greeting}>{user ? user.name : 'User'}!</Text>
      </View>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAlarmBox}
        ListEmptyComponent={<Text style={styles.emptyText}>No alarms set.</Text>}
        contentContainerStyle={styles.alarmList}
        numColumns={1}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('SetAlarm')}
      >
        <Image 
          source={require('../../assets/images/addicon.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>

      {/* Navigation bar
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
       */}
    </View>
  );
};

export default HomeScreen;

const { width } = Dimensions.get('window');
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
    marginTop:"-67%",
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%', // full width alarm box
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 20,
    paddingVertical:25,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  alarmLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  alarmTime: { 
    fontSize: 30, 
    color: '#fff', 
    marginBottom: 3 
  },
  alarmLabel: { 
    fontSize: 18, 
    color: '#fff' 
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

    padding: 10,
     
  },
  addIcon: { 
    width: 60, 
    height: 60,
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
