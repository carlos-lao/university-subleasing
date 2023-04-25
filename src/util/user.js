// external imports
import { Auth, Storage } from 'aws-amplify';
import { DataStore } from "@aws-amplify/datastore";
import { User, Like } from '../models';
import uuid from 'react-native-uuid';

// internal imports
import { store, setCurrentUser, resetCurrentUser, addLike, clearLikes } from '../store';

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
        "gender": gender,
        "birthDate": birthdate.toISOString().slice(0, 10),
        "listings": [],
        "comments": [],
        "likedListings": [],
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
    await Auth.signIn(email, password)
    const results = await DataStore.query(User, u => 
      u.email.eq(email)
    )
    const user = (({ _deleted, _lastChangedAt, _version, ...remainder}) => (remainder))(results[0])
    const profilePicture = await Storage.get(user.picture)
    const likes = await DataStore.query(Like, l => 
      l.userId.eq(user.id)
    )
    likes.forEach((like) => {
      store.dispatch(addLike(like.listingId))
    })
    store.dispatch(setCurrentUser({...user, picture: profilePicture}))
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
    store.dispatch(clearLikes())
    store.dispatch(resetCurrentUser())
  } catch (e) {
    return e.message;
  }
}

export const getUserWithId = async (id) => {
  try {
    const users = await DataStore.query(User, u => u.id.eq(id))
    const photo = await Storage.get(users[0].picture)
    return { ...users[0], picture: photo }
  }  catch (e) {
    console.log(e.message)
  }
}