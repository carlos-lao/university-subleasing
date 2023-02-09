// external imports
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// internal imports
import { colors } from '../../assets/style-guide';
import { SignInTab, InboxTab } from '../Screens/Tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ user }) => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      {/* <Tab.Screen
        name="Explore Tab"
        component={ExploreTab}
        options={{ tabBarIcon: ({ color, size }) => (
          <Icon name="home-search-outline" size={size} color={color}/>
        )}}
      />
      <Tab.Screen
        name="Liked Tab"
        component={LikedTab}
        options={{ tabBarIcon: ({ color, size }) => (
          <Icon name="heart-outline" size={size} color={color}/>
        )}}
      /> */}
      <Tab.Screen
        name="Inbox Tab"
        component={InboxTab}
        options={{ tabBarIcon: ({ color, size }) => (
          <Icon name="message-outline" size={size} color={color}/>
        )}}
      />
      <Tab.Screen
        name={user ? "Profile Tab" : "Sign In"}
        component={user ? ProfileTab : SignInTab}
        options={{ tabBarIcon: ({ color, size }) => (
          <Icon name="account-outline" size={size} color={color}/>
        )}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
