import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const OrboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/login.png')} />
      <View style={styles.container3}></View>
      <View style={styles.container2}>
        <View style={{ marginTop: '4%' }}>
        <Text style={styles.text1}>Discover The Best</Text>
        <Text style={styles.text1}>Smart Alarm</Text>
        <Text style={styles.text1}>App</Text>

        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.login}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrboardingScreen;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#141D2A',
  },
  container2: {
    padding: '10%',
    position: 'absolute',
    bottom: 0,
    height: '45%',
    width: width,
    backgroundColor: '#222B39',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -20,
    marginTop: -20,
  },
  text1: {
    textAlign: 'center',
    color: '#FFFFFF95',
    fontSize: 40,
  //  marginBottom: '0.5%',
  },
  image: {
    marginTop: '4%',
    height: 380,
    width: 380,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#796BF8',
    width: width / 2,
    paddingVertical: '3.5%',
    borderRadius: 30,
    marginTop: '10%',
    alignSelf: 'center',
  },
  login: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
