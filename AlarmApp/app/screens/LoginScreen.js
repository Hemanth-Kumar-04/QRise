import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image,Dimensions,TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import { saveData } from '../../src/storage/mmkvStorage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      saveData('jwtToken', res.data.token);
      saveData('user', res.data.user);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login failed', error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/login.png')}/>

      <View style={styles.container3}>
       
      </View>
      <View style={styles.container2}>
      <Text style = {styles.logintext1}>Email</Text>
      <TextInput 
        placeholder="" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"  
      />
      <Text style = {styles.logintext1}>Password</Text>
      <TextInput 
        secureTextEntry
        placeholder="" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 

      />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      <Text style={styles.footerText}>
        Not Registered?
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.footerLink}>
          {' '}
          Sign up!
        </Text>
        </Text>

        
      </View>
    
    </View>

  );
};

export default LoginScreen;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  button:{backgroundColor:'#796BF8'},
  container3:{flex: 1, justifyContent: 'center',marginLeft:-20,marginTop:-20},
  container: { flex: 1, justifyContent: 'center', padding: 20 ,backgroundColor: '#141D2A'},
  container2: {     
    padding: '10%',
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: width,
    backgroundColor: '#222B39',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,},
    footerText: {
      color: '#fff',
      textAlign: 'center',
      marginTop: 20,
    },
    footerLink: {
      color: '#FFD700',
    },
    login: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 20,
    },
    button:{
      backgroundColor:'#796BF8',
      width: width/2,
      paddingVertical:'3.5%',
      borderRadius:30,
      marginTop:20,
      alignSelf:'center'
    },
  logintext1: {
    color: '#FFFFFF75',

    fontSize: 20,
    marginBottom:'1.5%',
  },
  image:{
    marginTop:'2%',
    height:'380',
    width:'380',
    alignSelf:'center',
  },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5,backgroundColor:'#141D2A' ,color:'#FFFFFF75'},
});
