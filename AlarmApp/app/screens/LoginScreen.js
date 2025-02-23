import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image,Dimensions } from 'react-native';
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

      <View style={styles.container3}>
        <Image source={require('../../assets/images/login.png')} style={{ width: 400, height: 400, alignSelf: 'center' }} />
      </View>
      <View style={styles.container2}>

      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none" 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />
        <Button title="Login" onPress={handleLogin} style={styles.button}/>
        <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('Signup')} />
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
  container2: { flex: 1, justifyContent: 'center', marginTop: -100,width:width,backgroundColor:'#222B39',marginLeft:-20 },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 }
});
