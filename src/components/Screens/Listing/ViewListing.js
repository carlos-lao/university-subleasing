// external
import { useState, useRef, useEffect } from 'react';
import {
    ScrollView,
    Animated,
    Alert,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// internal
import { ROOM_TYPES, PROPERTY_TYPES, MONTHS } from '../../../util/constants';
import { colors, font } from '../../../../assets/style-guide';
import { Swiper, LocationView } from '../../Misc/Displays'
import { Button, BackButton } from '../../Misc/Pressables';
import { user, listing } from '../../../util';

const initialModalState = {
    visible: false,
    text: '',
};

const TOP_BAR_FADE_HEIGHT = 200
const TOP_BAR_ICON_SIZE = 25
const ANIMATION_TIME = 250

const ListingView = ({ navigation, route }) => {
    const { preview, listingInfo } = route.params
    const { top, bottom } = useSafeAreaInsets();

    const [currentUser, likes] = useSelector(({ user, likes }) => ([user, likes]))

    const [typeLabels, setTypeLabels] = useState(null);
    const [dates, setDates] = useState(null);
    const [creatorInfo, setCreatorInfo] = useState(null);
    const [liked, setLiked] = useState(false)
    const [topBarVisible, setTopBarVisible] = useState(false)

    const topBarOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        setLiked(likes.includes(listingInfo.id))
    }, [likes])

    // parse type labes and dates to display strings
    useEffect(() => {
        setTypeLabels(
            {
                property: PROPERTY_TYPES.find(p => p.value === listingInfo.propertyType).label,
                room: ROOM_TYPES.find(r => r.value === listingInfo.roomType).label
            }
        );
        setDates(
            {
                start: new Date(listingInfo.startDate),
                end: new Date(listingInfo.endDate)
            }
        );
    }, [])

    // load in creator information
    useEffect(() => {
        if (listingInfo.creator === currentUser?.id) {
            setCreatorInfo(currentUser)
        } else {
            user.getUserWithId(listingInfo.creator).then((data) =>
                setCreatorInfo(data)
            )
        }
    }, [])

    useEffect(() => {
        Animated.timing(
            topBarOpacity,
            { toValue: topBarVisible ? 1 : 0, duration: ANIMATION_TIME, useNativeDriver: true }
        ).start()
    }, [topBarVisible])

    const handleScroll = (e) => {
        if (!topBarVisible && e.nativeEvent.contentOffset.y >= TOP_BAR_FADE_HEIGHT) {
            setTopBarVisible(true)
        } else if (topBarVisible && e.nativeEvent.contentOffset.y < TOP_BAR_FADE_HEIGHT) {
            setTopBarVisible(false)
        }
    }

    const handleButtonPress = () => {
        if (preview) {
            listing.postListing(listingInfo).then((err) => {
                if (err == null) {
                    Alert.alert("Success", "Your listing has been successfully posted. You can view it under 'Active Listings' in your profile.", [
                        {
                            text: 'View Listing',
                            style: 'default',
                            onPress: () => navigation.navigate('Profile'),
                        },
                        {
                            text: 'Dismiss',
                            style: 'cancel',
                            onPress: () => navigation.navigate('Explore')
                        }
                    ])
                } else {
                    Alert.alert("Error", err)
                }
            })
        }
    }

    const handleLike = () => {
        if (currentUser == null) {
            Alert.alert('Log In to Continue', 'Sorry, you must be logged in to us this feature.', [
                {
                  text: 'OK',
                  style: 'cancel'
                },
                {
                  text: 'Sign In',
                  style: 'default',
                  onPress: () => navigation.navigate('Sign In Modal')
                }
              ])
        } else {
            listing.toggleLikeListing(listingInfo, currentUser)
        }
    }

    const renderTopBar = () => (
        <View style={{zIndex: 100, position: 'absolute', width: '100%', top: 0}}>
            <Animated.View style={[styles.topBarBackground, {height: top+50, opacity: topBarOpacity}]} />
            <View style={[styles.topBar, { paddingTop: top }]}>
                <BackButton
                    size={TOP_BAR_ICON_SIZE}
                    style={[styles.floatingButton, !topBarVisible && styles.floatingShadow]}
                    onPress={navigation.goBack}
                />
                {!preview && (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Listing QnA', {
                                    creatorInfo,
                                    listingInfo: {
                                        ...listingInfo,
                                        propertyType: typeLabels.property
                                    }
                                })
                            }}
                            style={[styles.floatingButton, !topBarVisible && styles.floatingShadow]}
                        >
                            <Icon name='chat-outline' size={TOP_BAR_ICON_SIZE} color={colors.black} />
                        </TouchableOpacity>
                        {listingInfo.creator != currentUser?.id &&
                            <TouchableOpacity onPress={handleLike} style={[styles.floatingButton, !topBarVisible && styles.floatingShadow]}>
                                <Icon name={liked ? 'heart' : 'heart-outline'} size={TOP_BAR_ICON_SIZE} color={liked ? colors.lightRed : colors.black} />
                            </TouchableOpacity>
                        }
                    </View>
                )}
            </View>
        </View>
        
    );

    const renderBottomBar = () => (
        <View style={[styles.bottomBar, { paddingBottom: bottom }]}>
            <View style={styles.pricingWrapper}>
                {listingInfo.negotiable && <Text style={styles.negotiableTag}>Negotiable</Text>}
                <Text style={styles.priceGroup}><Text style={styles.priceNumber}>${listingInfo.rate}</Text> month</Text>
                <Text style={styles.date}>{`${MONTHS[dates?.start?.getMonth()]} ${dates?.start?.getDate()}, ${dates?.start?.getFullYear()} – ${MONTHS[dates?.end?.getMonth()]} ${dates?.end?.getDate()}, ${dates?.end?.getFullYear()}`}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title={preview ? 'Post Listing' : (listingInfo.creator === currentUser?.id ? 'Edit Listing' : 'Make an Offer')}
                    onPress={() => {
                        handleButtonPress();
                    }}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderTopBar()}
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled onScroll={handleScroll} scrollEventThrottle={16}>
                    {/* Swiper */}
                    <Swiper
                        style={styles.swiper}
                        photos={listingInfo.photos}
                    />

                    {/* Text Details */}
                    <View style={styles.textDetails}>

                        {/* Title and Property Type */}
                        <Text style={styles.title}>{listingInfo.title}</Text>
                        <Text style={styles.type}>{`${typeLabels?.property} • ${typeLabels?.room}`}</Text>

                        {/* Creator Details */}
                        <View style={[styles.textSection, styles.creatorSection]}>
                            <Text style={styles.creator}>Subleased by {creatorInfo?.name}</Text>
                            {
                                <Image style={styles.avatar} source={{ uri: creatorInfo?.picture }} />
                            }
                        </View>

                        {/* Listing Description */}
                        <View style={styles.textSection}>
                            <Text style={styles.description}>{listingInfo.description}</Text>
                        </View>

                        {/* Location */}
                        <View style={styles.textSection}>
                            <Text style={styles.sectionHeader}>Where it's located</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <LocationView style={styles.map} address={listingInfo.address} />
                                <Text style={styles.mapCaption}>Exact location provided upon signing the sublease contract</Text>
                            </View>
                        </View>

                        {/* Perks */}
                        <View style={styles.textSection}>
                            <Text style={styles.sectionHeader}>Perks of this property</Text>
                            {Object.keys(listingInfo.perks).map((category) => (
                                listingInfo.perks[category].length > 0 &&
                                <View style={styles.perkCategoryContainer} key={category}>
                                    <View style={styles.perkCategoryHeaderContainer}>
                                        <Text style={styles.perkCategoryHeader}>{category}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginRight: 15, flex: 1 }}>
                                            {listingInfo.perks[category].slice(0, Math.ceil(listingInfo.perks[category].length / 2))
                                                .slice().map((tag) => {
                                                    // perkInfo = [ perk title, perk icon ]
                                                    const perkInfo = tag.split('_');
                                                    return (
                                                        <View style={styles.perkWrapper} key={tag}>
                                                            <Icon name={perkInfo[1]} size={20} />
                                                            <Text style={styles.perkText}>{perkInfo[0]}</Text>
                                                        </View>
                                                    );
                                                })}
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            {listingInfo.perks[category].slice(Math.ceil(listingInfo.perks[category].length / 2))
                                                .map((tag) => {
                                                    // perkInfo = [ perk title, perk icon ]
                                                    const perkInfo = tag.split('_');
                                                    return (
                                                        <View style={styles.perkWrapper} key={tag}>
                                                            <Icon name={perkInfo[1]} size={20} />
                                                            <Text style={styles.perkText}>{perkInfo[0]}</Text>
                                                        </View>
                                                    );
                                                })}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            {renderBottomBar()}
        </View>
    );
}

export default ListingView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    swiper: {
        height: 350,
        width: '100%',
    },
    textDetails: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    textSection: {
        borderTopColor: colors.gray,
        borderTopWidth: 0.5,
        paddingVertical: 20,
    },
    title: {
        fontSize: font.xlarge,
        fontWeight: '600'
    },
    type: {
        color: colors.gray,
        marginTop: 10,
        marginBottom: 20,
    },
    creatorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    creator: {
        fontSize: font.large,
        fontWeight: '500',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: colors.lightGray,
    },
    description: {
        fontSize: font.medium,
    },
    sectionHeader: {
        fontSize: font.large,
        fontWeight: '600',
        marginBottom: 5,
    },
    perkCategoryContainer: {
        marginTop: 10
    },
    perkCategoryHeaderContainer: {
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 0.2,
        marginBottom: 10,
    },
    perkCategoryHeader: {
        fontSize: font.medium + 1,
        fontWeight: '200',
        paddingBottom: 2
    },
    perkWrapper: {
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    perkText: {
        fontSize: font.medium - 1,
        fontWeight: '300',
        marginLeft: 5,
    },
    map: {
        marginVertical: 10
    },
    mapCaption: {
        fontSize: font.xsmall,
        color: colors.gray,
        textAlign: 'center'
    },

    // Top bar styles
    topBarBackground: {
        backgroundColor: colors.white,
        width: '100%',
        position: 'absolute',
        top: 0,
        borderBottomColor: colors.black,
        borderBottomWidth: 0.5,
    },
    topBar: {
        position: 'absolute',
        paddingHorizontal: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    floatingButton: {
        backgroundColor: colors.white,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    floatingShadow: {
        shadowOpacity: 0.4,
    },

    // Bottom bar styles
    bottomBar: {
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: colors.gray,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    pricingWrapper: {
        flex: 3,
    },
    buttonWrapper: {
        flex: 2,
    },
    negotiableTag: {
        color: colors.success,
        fontSize: font.xsmall,
        fontWeight: '600',
        marginBottom: 3,
    },
    date: {
        color: colors.gray,
        fontSize: font.xsmall,
    },
    priceGroup: {
        fontWeight: '300',
        marginBottom: 3
    },
    priceNumber: {
        fontWeight: 'bold',
        fontSize: font.large,
    },

    addPerkContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    addPerkView: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingTop: 30,
        paddingBottom: 65,
        alignItems: "stretch",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addPerkTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: font.medium
    },
    addPerkText: {
        fontWeight: '300',
        marginTop: 10,
        marginBottom: 20
    },
    addPerkButtonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    addPerkModalButtonContainer: {
        flex: 1,
        borderColor: colors.gray,
        height: 45,
        borderTopWidth: 0.5,
    },
    addPerkModalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPerkModalButtonText: {
        fontSize: font.medium,
        fontWeight: '600'
    },
    disabledButtonText: {
        color: colors.lightGray,
    }
});
