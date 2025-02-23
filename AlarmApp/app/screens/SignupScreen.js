import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { saveData } from "../../src/storage/mmkvStorage";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      // Replace with your actual backend URL
      const res = await axios.post("http://10.0.2.2:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      saveData("jwtToken", res.data.token);
      saveData("user", res.data.user);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Signup failed",
        error.response?.data?.message || "Error occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View>
        <Image
          source={require("../../assets/images/login.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        style={styles.input}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
});
