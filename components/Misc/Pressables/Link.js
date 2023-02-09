// external imports
import {
  Linking,
  Text,
  StyleSheet,
} from 'react-native';

const Link = ({ url, onPress, style, children }) => (
  <Text
    onPress={onPress || (() => {
      if (url) { Linking.openURL(url); }
      else { console.log(`WARNING: Link "${children}" has not been set up.`); }
    })}
    style={[{ textDecorationLine: 'underline' }, style]}
  >
    {children}
  </Text>
);

export default Link;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
