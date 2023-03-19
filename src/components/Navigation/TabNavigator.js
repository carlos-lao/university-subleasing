// external imports
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// internal imports
import { colors } from '../../../assets/style-guide';
import { SignInTab, InboxTab, LikedTab, ExploreTab } from '../Screens/Tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ user }) => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreTab}
        options={{ tabBarIcon: ({ color, size }) => (
          <Icon name="home-search-outline" size={size} color={color}/>
        )}}
      />
      <Tab.Screen
        name="Liked"
        component={LikedTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="heart-outline" size={25} color={color}/>
        )}}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="message-outline" size={25} color={color}/>
        )}}
      />
      <Tab.Screen
        name={user ? "Profile" : "Sign In"}
        component={user ? ProfileTab : SignInTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="account-outline" size={25} color={color}/>
        )}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
