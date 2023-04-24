// external imports
import { Auth, Storage } from 'aws-amplify';
import { DataStore } from "@aws-amplify/datastore";
import { User } from '../models';
import uuid from 'react-native-uuid';

// internal imports
import { convertToAWSDate } from './util';
import { store, setCurrentUser, resetCurrentUser } from '../store';

// users must be at least 18
export const getMinBirthdate = () => (new Date((new Date()).getFullYear()-18, (new Date()).getMonth(), (new Date()).getDate()));

// password requirements to check
export const passwordReqts = [
  {
    msg: "Must contain 8 characters",
    fulfilled: (password) => (password.length >= 8),
  },
  {
    msg: "Must contain an uppercase letter",
    fulfilled: (password) => (/[A-Z]/.test(password)),
  },
  {
    msg: "Must contain a lowercase letter",
    fulfilled: (password) => (/[a-z]/.test(password)),
  },
  {
    msg: "Must contain a number",
    fulfilled: (password) => (/\d/.test(password)),
  },
  {
    msg: "Must contain a special character",
    fulfilled: (password) => (/[\^\$\*\.\[\]\{\}\(\)\?\-"!@#\%\&\/\\,><':;\|_~`\+=)]/.test(password)),
  },
];

// create user
export const signUp = async ({ imageURI, name, birthdate, gender, email, password }) => {
  const imageFilename = `profilePictures/${uuid.v4()}.jpg`
  try {
    const response = await fetch(imageURI);
    const img = await response.blob();

    await Auth.signUp({
      username: email,
      password,
      attributes: {
        gender, name, 
        birthdate: birthdate.toISOString().slice(0,10),
        picture: imageFilename
      }
    });

    await Storage.put(imageFilename, img, {
      level: "public",
      contentType: "image/jpg",
    });
    
    await DataStore.save(
      new User({
        "name": name,
        "email": email,
        "picture": imageFilename,
        "posts": [],
        "comments": [],
        "likes": [],
        "gender": gender,
        "birthDate": birthdate.toISOString().slice(0, 10)
      })
    );
  } catch (e) {
    return e.message;
  }
}

export const confirmSignUp = async (email, code) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (e) {
    return e.message;
  }
}

export const signIn = async (email, password) => {
  try {
    const {attributes} = await Auth.signIn(email, password)
    const profilePicture = await Storage.get(attributes.picture)
    const users = await DataStore.query(User, u => u.email.eq(email));
    store.dispatch(setCurrentUser({...attributes, picture: profilePicture, id: users[0].id}))
  } catch (e) {
    if (e.name == "UserNotConfirmedException") {
      return "unconfirmed";
    }
    return e.message;
  }
}

export const signOut = async () => {
  try {
    await Auth.signOut();
    DataStore.clear();
    store.dispatch(resetCurrentUser())
  } catch (e) {
    return e.message;
  }
}