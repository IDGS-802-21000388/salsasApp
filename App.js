import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductScreen from './views/ProductScreen';
import LoginScreen from './views/LoginScreen';
import { NativeBaseProvider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FirstRoute = () => (
  <ProductScreen />
);

const SecondRoute = () => (
  <LoginScreen />
);

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Home' },
    { key: 'second', title: 'Login' },
  ]);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#217765' }}
              style={styles.tabBar}
              labelStyle={styles.labelStyle}
            />
          )}
        />

        {/* Carrito flotante */}
        <TouchableOpacity style={styles.cartButton} onPress={() => alert('Carrito')}>
          <Ionicons name="cart" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,  
    left: 0,
    right: 0,
  },
  labelStyle: {
    color: '#217765',
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    bottom: 90,  
    right: 20,
    backgroundColor: '#c31a23',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
