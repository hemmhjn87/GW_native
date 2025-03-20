import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from "../../../config/firebase";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (email === 'user@garbagewalla.com' && password === 'password123') {
      Alert.alert('Demo Login', 'You have logged in with demo credentials.');
      setIsAuthenticated(true); 
      return;
    }
  
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      Alert.alert('Success', `Welcome, ${user.email}!`);
      setIsAuthenticated(true); 
    } catch (error) {
      console.error("Login Error: ", error.code); // Debugging Purpose
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No user found with this email. Please register.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Invalid email format. Please enter a valid email.");
      } else {
        Alert.alert("Login Failed", error.message);
      }
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>GW</Text>
            </View>
            <Text style={styles.logoTitle}>GarbageWalla</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default LoginScreen;
