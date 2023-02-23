// external imports
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

// internal imports
import { colors } from '../../../../assets/style-guide';

const Container = ({ children, style, safe }) => {
    return safe ?
      (<SafeAreaView style={[styles.container, style]}>
        {children}
      </SafeAreaView>) :
      (<View style={[styles.container, style]}>
        {children}
      </View>);
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
});
