// external imports
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// internal imports
import { colors, font, dimensions } from '../../../assets/style-guide';
import { Button } from '../../Misc/Pressables';
import { TextInput, Dropdown } from '../../Misc/Inputs';
import { Header } from '../../Misc/System';
import { Container, KeyboardDismisser } from '../../Misc/Templates';
import { account, consts } from '../../../src/util';

// constant
const initialUserInfoState = {
  imageURI: '',
  name: '',
  birthdate: null,
  gender: null,
  email: '',
  password: '',
};

const SignUp = ({ auth, signUp, navigation }) => {
  // constants
  const { bottom } = useSafeAreaInsets();

  // state
	const [userInfo, setUserInfo] = useState(initialUserInfoState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // lifecycle
  /* TODO: add photos permission reqt
  useEffect(() => {
    
  }, []);
  */

  // helper functions
	const handleSignUp = () => {
    const { imageURI, name, birthdate, gender, email, password } = userInfo;

		if (!name || !birthdate || !gender || !email || !password) {
			alert("Please fill in all fields.");
			return;
		} else if (!imageURI) {
      alert("Please add a profile photo.");
      return;
    }

    if (account.passwordReqts.map(({ fulfilled }) => (fulfilled(password))
    ).includes(false)) {
      alert("Check to make sure your password fulfills all requirements.");
      return;
    }

	  signUp(userInfo);
    navigation.navigate('Confirm Account', { email });
	}

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    
    try {
      if (!result.canceled) {
        setUserInfo({ ...userInfo, imageURI: result.assets[0].uri })
      }
    } catch (e) {
      console.log(e);
      alert("Uh oh! An unexpected error occurred. Try uploading your photo again.")
    }
  }

  const renderDateField = () => (
    <Pressable
      style={[
        styles.input,
        styles.dateField,
        showCalendar && { borderColor: colors.black }
      ]}
      onPress={() => setShowCalendar(true)}
    >
      <Text style={styles.dateLabel}>Date of Birth</Text>
      <Text style={[
          styles.dateText,
          userInfo.birthdate && { color: colors.black }
      ]}>
        {
          userInfo.birthdate ?
          `${consts.MONTHS[userInfo.birthdate.getMonth()]} ${userInfo.birthdate.getDate()}, ${userInfo.birthdate.getFullYear()}` :
          "Enter your DOB"
        }
      </Text>
    </Pressable>
  );

  const renderPictureField = () => (
    <View style={styles.pictureContainer}>
      {
        userInfo.imageURI !== '' &&
        <Image
          source={{ uri: userInfo.imageURI }}
          style={{ width: 200, height: 200 }}
        />
      }
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={addImage} >
          <Icon name="camera" size={15} color={colors.black} />
          <Text> {userInfo.picture ? 'Edit' : 'Upload'} Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardDismisser>
      <Header
        modal
        onPressBack={navigation.goBack}
        title='Sign Up'
      />
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior='position' onStartShouldSetResponder={() => true}>
            <View style={[styles.input, {alignItems: 'center' }]}>
              {renderPictureField()}
            </View>
            <TextInput
              label="Name"
              textContentType="name"
              style={styles.input}
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
            {renderDateField()}
            <Text
              style={styles.notice}
            >
              You must be at least 18 years old to create an account.
            </Text>
            <Dropdown
              style={styles.input}
              open={showDropdown}
              label='Gender'
              placeholder='Select your gender'
              setOpen={setShowDropdown}
              value={userInfo.gender}
              onSelectItem={(item) => { setUserInfo({ ...userInfo, gender: item.value }) }}
              items={consts.GENDERS}
            />
            <TextInput
              label="Email"
              placeholder="jdoe@example.com"
              style={[styles.input, { zIndex: -1 }]}
  						value={userInfo.email}
              textContentType="emailAddress"
              onChangeText={(text) => { setUserInfo({ ...userInfo, email: text }) } }
            />
            <TextInput
              toggleableSecurity
              label="Password"
              style={[styles.input, { zIndex: -1 }]}
              value={userInfo.password}
              textContentType="newPassword"
              onChangeText={(text) => { setUserInfo({ ...userInfo, password: text }) } }
            />
            {account.passwordReqts.map( ({ msg, fulfilled }, index) => (
              fulfilled(userInfo.password) ?
              null :
              <Text
                style={[styles.notice, { zIndex: -1 }]}
                key={index.toString()}
              >
                {msg}
              </Text>
            ))}
            <Button
              title="Continue"
              style={[styles.button, {marginBottom: bottom}]}
              containerStyle={{ backgroundColor: colors.black }}
              onPress={handleSignUp}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <DateTimePickerModal
          isVisible={showCalendar}
          mode="date"
          onConfirm={( date ) => {
            setUserInfo({ ...userInfo, birthdate: date });
            setShowCalendar(false);
          }}
          date={userInfo.birthdate || account.getMinBirthdate()}
          maximumDate={account.getMinBirthdate()}
          onCancel={() => setShowCalendar(false)}
        />
      </Container>
    </KeyboardDismisser>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    marginTop: 15,
  },
  note: {
    color: colors.black,
    fontSize: font.xsmall,
    marginTop: 3,
  },
  notice: {
    color: colors.gray,
    fontSize: font.xsmall,
    marginTop: 3,
    marginLeft: 4
  },
  button: {
    marginTop: 20,
    zIndex: -1
  },
  dateField: {
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: dimensions.borderRadius,
    borderWidth: 0.5,
    borderColor: colors.gray
  },
  dateLabel: {
    marginBottom: 5,
    fontSize: font.xsmall,
    color: colors.gray
  },
  dateText: {
    height: 20,
    fontSize: font.medium,
    color: colors.lightGray
  },
  pictureContainer: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: colors.gray,
    position: 'relative',
    borderRadius: '100%',
    overflow: 'hidden',
    borderColor: colors.black,
    borderWidth: 0.5
  },
  uploadButtonContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.lightGray,
    width: '100%',
    height: 45,
    borderColor: colors.black,
    borderTopWidth: 0.5
  },
  uploadButton: {
    flex: 1,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  }
});
