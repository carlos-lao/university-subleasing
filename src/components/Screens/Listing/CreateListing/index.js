// external
import { useState, useRef, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

// external
import { STD_PERK_ICONS } from '../../../../util/constants';
import { Container, KeyboardDismisser } from '../../../Misc/Templates';
import { Header } from '../../../Misc/System';
import MainEntry from './MainEntry';
import PerksEntry from './PerksEntry';
import DescriptionEntry from './DescriptionEntry';
import AddPerkModal from './AddPerkModal';
import PhotoEntry from './PhotoEntry';

// TODO: add autofill for campuses

const LISTING_INFO_INIT_STATE = {
    title: '',
    campus: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    },
    rate: null,
    negotiable: false,
    description: '',
    propertyType: '',
    roomType: '',
    startDate: null,
    endDate: null,
    photos: [],
    perks: {
        "Utilities": [],
        "Included Furniture": [],
        "Kitchen Amenities": [],
        "Bath and Wash": [],
        "Communal Amenities": [],
        "Walking Distance To": [],
        "Preferences": []
    }
}
const ADDED_PERKS_INIT_STATE = {
    "Included Furniture": [],
    "Kitchen Amenities": [],
    "Bath and Wash": [],
    "Communal Amenities": [],
    "Walking Distance To": [],
    "Preferences": []
}
const ADD_PERK_MODAL_INIT_STATE = {
    visible: false,
    category: ''
}

const initialListingInfoState = {
    title: 'Test Property',
    campus: 'USC',
    address: {
        street: '1159 W 29th St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90007'
    },
    rate: 1800,
    negotiable: true,
    description: faker.lorem.paragraph(10),
    propertyType: 'town',
    roomType: 'double',
    startDate: new Date(2023, 8, 16),
    endDate: new Date(2022, 12, 19),
    photos: [],
    perks: LISTING_INFO_INIT_STATE.perks
};

const ANIMATION_TIME = 250

const CreateListing = ({ navigation }) => {
    // constants
    const currentUser = useSelector(({ user }) => (user))

    // state
    const [currPage, setCurrPage] = useState(1);
    const [listingInfo, setListingInfo] = useState({
        ...LISTING_INFO_INIT_STATE,
        creator: currentUser.id
    })
    const [addedPerks, setAddedPerks] = useState(ADDED_PERKS_INIT_STATE);
    const [addPerkModal, setAddPerkModal] = useState(ADD_PERK_MODAL_INIT_STATE);
    const [showCalendar, setShowCalendar] = useState(false);

    const pageOpacity = [useRef(new Animated.Value(1)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current]

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
          setAddedPerks(ADDED_PERKS_INIT_STATE);
        });
        return focusHandler;
      }, [navigation]);

    const pageTransition = (origIdx, destIdx) => {
        Animated.timing(
            pageOpacity[origIdx],
            { toValue: 0, duration: ANIMATION_TIME, useNativeDriver: true }
        ).start(() => {
            setCurrPage(destIdx + 1);
            Animated.timing(
                pageOpacity[destIdx],
                { toValue: 1, duration: ANIMATION_TIME, useNativeDriver: true }
            ).start();
        });
    }

    // transition functions
    const prevPage = () => {
        if (currPage === 1) {
            Alert.alert("Exit Without Saving", "Are you sure you want to stop working on this listing? Any changes you made will not be saved", [
                {
                    text: "Continue Editing",
                    style: 'default'
                },
                {
                    text: "Yes, I'm Sure",
                    style: 'destructive',
                    onPress: () => navigation.goBack()
                }
            ])
        } else {
            const currIdx = currPage - 1;
            pageTransition(currIdx, currIdx - 1);
        }
    }

    const nextPage = () => {
        if (currPage === pageOpacity.length) {
            const { address } = listingInfo;
            navigation.navigate('View Listing', {
                preview: true,
                listingInfo: {
                    ...listingInfo,
                    address: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
                    startDate: listingInfo.startDate.toISOString().slice(0, 10),
                    endDate: listingInfo.endDate.toISOString().slice(0, 10)
                }
            })
        } else {
            const currIdx = currPage - 1;
            pageTransition(currIdx, currIdx + 1);
        }
    }

    const propagateChanges = (updates) => setListingInfo({ ...listingInfo, ...updates })

    return (
        <KeyboardDismisser safe>
            <Header
                modal
                title="Create Listing"
                onPressBack={prevPage}
            />
            <Container>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                    {currPage === 1 &&
                        <MainEntry
                            opacity={pageOpacity[0]}
                            value={listingInfo}
                            onSubmit={nextPage}
                            propagateChanges={propagateChanges}
                            leaseStart={listingInfo.startDate}
                            leaseEnd={listingInfo.endDate}
                            showCalendar={showCalendar}
                            setShowCalendar={setShowCalendar}
                        />
                    }

                    {currPage == 2 &&
                        <PhotoEntry
                            opacity={pageOpacity[1]}
                            value={listingInfo.photos}
                            onSubmit={nextPage}
                            propagateChanges={propagateChanges}
                            maxPhotos={8}
                        />
                    }

                    {currPage === 3 &&
                        <PerksEntry
                            opacity={pageOpacity[2]}
                            value={listingInfo.perks}
                            onSubmit={nextPage}
                            propagateChanges={propagateChanges}
                            addedPerks={addedPerks}
                            onAddPerk={(category) => { setAddPerkModal({ visible: true, category: category }) }}
                        />
                    }

                    {currPage === 4 &&
                        <DescriptionEntry
                            opacity={pageOpacity[3]}
                            value={listingInfo.description}
                            onSubmit={nextPage}
                            propagateChanges={propagateChanges}
                        />
                    }
                </ScrollView>
                </KeyboardAvoidingView>
                <DateTimePickerModal
                    isVisible={showCalendar}
                    mode="date"
                    onConfirm={(date) => {
                        if (!listingInfo.startDate) {
                            setListingInfo({ ...listingInfo, startDate: date });
                        } else {
                            setListingInfo({ ...listingInfo, endDate: date });
                            setShowCalendar(false);
                        }
                    }}
                    minimumDate={listingInfo.startDate || new Date()}
                    onCancel={() => {
                        setListingInfo({ ...listingInfo, startDate: null, end: null });
                        setShowCalendar(false);
                    }}
                />
                <AddPerkModal
                    category={addPerkModal.category}
                    visible={addPerkModal.visible}
                    onClose={() => setAddPerkModal(ADD_PERK_MODAL_INIT_STATE)}
                    onSubmit={(text) => {
                        const { category } = addPerkModal;
                        let dbTag = `${text}_${STD_PERK_ICONS[category]}`

                        let temp = addedPerks
                        temp[category].push({ title: text, val: dbTag })

                        setAddedPerks(temp)
                        setListingInfo({...listingInfo, perks: {...listingInfo.perks, [category]: [ ...listingInfo.perks[category], dbTag] }})
                    }}
                />
            </Container>
        </KeyboardDismisser>
    );
}

export default CreateListing;
