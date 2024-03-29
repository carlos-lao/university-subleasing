// external imports
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// internal imports
import { StackNavigator } from './src/components/Navigation';
import { store } from './src/store';

Amplify.configure(awsconfig)
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark"/>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
