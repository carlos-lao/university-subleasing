// external
import { useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Redirect } from '../../Misc/Pressables'
import { Header } from '../../Misc/System';
import { Container } from '../../Misc/Templates';
import { colors, font } from '../../../../assets/style-guide';
import { user } from '../../../util';

const ProfileTab = ({ navigation }) => {
    const { top } = useSafeAreaInsets();
    const currentUser = useSelector(({ user }) => (user))

    const handleSignOut = () => {
        user.signOut().then((err) => {
            if (err == null) {
                navigation.navigate("Sign In")
            } else {
                Alert.alert("Error", err)
            }
        })
    }

    return (
        <Container style={{paddingTop: top}}>
        <Header hr title="Your profile"/>
        <ScrollView>
            <View style={styles.profilePreview}>
            <Text style={styles.userName}>Welcome, {currentUser.name}</Text>
            {/* TODO: Implement BlurHash Placeholders */}
            <Image
                source={{ uri: currentUser.picture }}
                style={styles.avatar}
            />
            </View>
            <Text style={styles.subheader}>Leasing</Text>
            <Redirect
            title="List your space"
            icon={{ name: 'home-plus-outline', color: 'black' }}
            onPress={() => {navigation.navigate('Create Listing');}}
            />
            <Redirect
            title="Payments and payouts"
            icon={{ name: 'cash-fast', color: 'black' }}
            />
            <Redirect
            title="View active listings"
            icon={{ name: 'home-plus-outline', color: 'black' }}
            onPress={() => {navigation.navigate('Active Listings');}}
            />
            <Text style={styles.subheader}>Account Settings</Text>
            <Redirect
            title="Reset password"
            />
            <Redirect
            title="Edit profile"
            />
            <Redirect
            title="Log Out"
            onPress={handleSignOut}
            />
        </ScrollView>
        </Container>
  );
}

export default ProfileTab;

const styles = StyleSheet.create({
  profilePreview: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: colors.lightGray
  },
  userName: {
    fontSize: font.large,
    fontWeight: '300',
  },
  subheader: {
    fontWeight: '500',
    fontSize: font.large,
    marginTop: 30,
    marginBottom: 10,
  },
});
