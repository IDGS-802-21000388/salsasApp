import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MateriaPrimaScreen from './views/MateriaPrimaScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
import { View, Text, StyleSheet } from 'react-native';

const CustomToast = ({ text1, text2, type }) => (
  <View
    style={[
      styles.toastContainer,
      { borderLeftColor: type === 'success' ? 'green' : 'red' },
    ]}
  >
    {text1 && <Text style={styles.toastTitle}>{text1}</Text>}
    {text2 && <Text style={styles.toastMessage}>{text2}</Text>}
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  toastTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  toastMessage: {
    fontSize: 14,
  },
});

const ThirdRoute = () => (
  <MateriaPrimaScreen />
);

export default function App() {
  return (
    <NativeBaseProvider>
      <ToastProvider
        placement="bottom"
        duration={5000}
        swipeEnabled={true}
        animationType="slide-in"
        offset={50}
        renderToast={(toastOptions) => <CustomToast {...toastOptions} />}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ToastProvider>
    </NativeBaseProvider>
  );
}
