// external imports
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// internal imports
import { colors } from '../../../assets/style-guide';
import { SignInTab, InboxTab, LikedTab, ExploreTab } from '../Screens/Tabs';

const Tab = createBottomTabNavigator();
const ICON_SIZE = 35;

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
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="home-search-outline" size={ICON_SIZE} color={color}/>
        )}}
      />
      <Tab.Screen
        name="Liked"
        component={LikedTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="heart-outline" size={ICON_SIZE} color={color}/>
        )}}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="message-outline" size={ICON_SIZE} color={color}/>
        )}}
      />
      <Tab.Screen
        name={user ? "Profile" : "Sign In"}
        component={user ? ProfileTab : SignInTab}
        options={{ tabBarIcon: ({ color }) => (
          <Icon name="account-outline" size={ICON_SIZE} color={color}/>
        )}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
