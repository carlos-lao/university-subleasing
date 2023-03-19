// external imports
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

// internal imports
import { StackNavigator } from './src/components/Navigation';

// additional dependencies
import 'react-native-gesture-handler';

Amplify.configure(awsconfig)

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
