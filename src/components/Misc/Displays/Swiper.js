// external imports
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { Swiper as RNSwiper } from 'react-native-swiper';

// internal imports
import { colors, dimensions, font } from '../../../../assets/style-guide';

const numberedPagination = (idx, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={styles.paginationText}>{idx + 1} / {total}</Text>
    </View>
  )
}

const Swiper = ({ style, images, useDots, ...props }) => {

  return (
    <View style={[style, !images && styles.center]}>
      <RNSwiper
        key={images.length}
        activeDotColor={Colors.blueOne}
        paginationStyle={{ marginBottom: -15 }}
        renderPagination={useDots ? null : numberedPagination}
        loop={false}
        {...props}
      >
        {images.map((src, idx) =>
          <Image source={{ uri: src }} style={styles.slide} key={idx}/>
        )}
      </RNSwiper>
    </View>
  );
}

export default Swiper;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  paginationStyle: {
    position: 'absolute',
    padding: 5,
    bottom: 10,
    right: 10,
    backgroundColor: colors.black + '80',
    borderRadius: dimensions.borderRadius,
  },
  paginationText: {
    color: colors.white,
    fontSize: font.xsmall,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
