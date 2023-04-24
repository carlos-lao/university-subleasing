// external
import { useState, useEffect } from 'react';
import { 
    ActivityIndicator,
    View, 
    StyleSheet, 
    Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

// internal
import { colors, dimensions } from '../../../../assets/style-guide';

const LocationView = ({ address, style }) => {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const getCoordinates = async () => {
            const position = await Location.geocodeAsync(address, { useGoogleMaps: true });
            setCoordinates(position[0]);
        }
        Location.setGoogleApiKey('AIzaSyBG0LPjBjWiBMULSzY8elxPi7wIlhXZPY8');
        getCoordinates();
    }, []);

    const renderLoading = () => (
        <ActivityIndicator size="large" color={colors.secondary}/>
    );

    const renderMap = () => (
        // FIXME: this is scrolling more than it needs to
        <MapView
            style={styles.map}
            provider="google"
            initialRegion={{
                ...coordinates,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }}
        >
            <Circle 
                center={coordinates}
                radius={120}
                fillColor={colors.secondary+'90'}
                strokeColor={colors.secondary}
                strokeWidth={3}
            />
        </MapView>
    );

    return (
        <View style={[styles.container, style]}>
            { coordinates ? renderMap() : renderLoading() }
        </View>
    );
}

export default LocationView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: dimensions.borderRadius,
        overflow: 'hidden',
        width: Dimensions.get('window').width - 60,
        borderWidth: 1,
        borderColor: colors.lightGray
    },
    map: {
        width: Dimensions.get('window').width - 60,
        height: 300
    },
    pin: {
        backgroundColor: colors.secondary,
        overflow: 'hidden',
        borderRadius: 25,
    }
});