// external imports
import { createStackNavigator } from '@react-navigation/stack';

// internal imports
import TabNavigator from './TabNavigator';
import { SignUp, SignIn } from '../Screens/Account'
// import { 
//   CreateListing, 
//   ListingView, 
//   LogIn, 
//   SignUp, 
//   ConfirmAccount, 
//   UserChat,
//   ActiveListings,
//   ListingQA
// } from '../Views';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Group>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* <Stack.Screen name="Create Listing" component={CreateListing} />
      <Stack.Screen name="View Listing" component={ListingView} />
      <Stack.Screen name="User Chat" component={UserChat}/>
      <Stack.Screen name="Active Listings" component={ActiveListings} />
      <Stack.Screen name="Listing QnA" component={ListingQA} /> */}
    </Stack.Group>
    <Stack.Group screenOptions={{presentation: 'modal'}}>
      <Stack.Screen name="Sign In Modal" component={SignIn}/>
      <Stack.Screen name="Sign Up" component={SignUp}/>
      {/* <Stack.Screen name="Confirm Account" component={ConfirmAccount}/> */}
    </Stack.Group>
  </Stack.Navigator>
);

export default StackNavigator;