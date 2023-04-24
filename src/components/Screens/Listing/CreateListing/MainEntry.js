// external
import { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, KeyboardAvoidingView, Switch, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// internal
import { ROOM_TYPES, PROPERTY_TYPES } from '../../../../util/constants';
import { colors, font, dimensions } from '../../../../../assets/style-guide';
import { TextInput, Dropdown } from '../../../Misc/Inputs';
import { Button } from '../../../Misc/Pressables';

const MainEntry = ({ opacity, value, onSubmit, propagateChanges, showCalendar, setShowCalendar, leaseStart, leaseEnd}) => {
    // TODO: add field validation
    const { bottom } = useSafeAreaInsets();

    const [enableKeyboardAvoiding, setEnableKeyboardAvoiding] = useState(false);
    const [showDropdown, setShowDropdown] = useState({
        first: false,
        second: false
    });
    const [listingInfo, setListingInfo] = useState((({ perks, images, description, start, end, ...picked }) => (picked))(value))
    const [leasePeriod, setLeasePeriod] = useState({ start: leaseStart, end: leaseEnd })

    useEffect(() => {
        setLeasePeriod({ start: leaseStart, end: leaseEnd })
    }, [leaseStart, leaseEnd])

    useEffect(() => {
        propagateChanges({ ...listingInfo, ...leasePeriod })
    }, [listingInfo, leasePeriod])

    const renderDateField = () => {
        const getDateString = (date) => (
            date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : null
        );

        return (
            <Pressable
                style={[
                    styles.input,
                    styles.dateField,
                    showCalendar && { borderColor: colors.black }
                ]}
                onPress={() => {
                    setLeasePeriod({start: null, end: null})
                    setShowCalendar(true);
                }}
            >
                <Text style={styles.dateLabel}>Lease Duration</Text>
                <Text
                    style={[styles.dateDisplay, leasePeriod.start && { color: colors.black }]}
                >
                    {getDateString(leasePeriod.start) || "Start Date"}
                    {leasePeriod.end ? ` – ${getDateString(leasePeriod.end)}` : " – End Date"}</Text>
            </Pressable>
        );
    };


    return (
        <Animated.View
            style={{ opacity: opacity }}
            onStartShouldSetResponder={() => true}
        >
            <KeyboardAvoidingView behavior='position' enabled={enableKeyboardAvoiding}>
                <Text style={styles.infoHeader}>Listing Information</Text>
                {/* Title Input */}
                <TextInput
                    style={styles.input}
                    label="Title"
                    value={listingInfo.title}
                    onChangeText={(text) => {
                        if (text.length <= 50)
                            setListingInfo({ ...listingInfo, title: text })
                    }}
                />

                {/* Lease Duration Input */}
                {renderDateField()}

                {/* Rate Input */}
                <View style={styles.rateContainer}>
                    <TextInput
                        style={[styles.input, styles.rateInput]}
                        label="Monthly Rate"
                        placeholder='$'
                        labelStyle={styles.inputLabel}
                        value={listingInfo.rate ? `$${listingInfo.rate}` : ''}
                        onChangeText={(text) => {
                            text = text.replace(/\$/, '')
                            if (/^\d*$/.test(text)) {
                                setListingInfo({ ...listingInfo, rate: parseInt(text) });
                            }
                        }}
                        keyboardType="decimal-pad"
                    />
                    <View style={styles.negotiableContainer}>
                        <Text style={styles.negotiableText}>Negotiable?</Text>
                        <Switch
                            value={listingInfo.negotiable}
                            onValueChange={(val) => { setListingInfo({ ...listingInfo, negotiable: val }) }}
                            trackColor={{ true: colors.primary }}
                        />
                    </View>
                </View>

                {/* Property Type Input */}
                <Dropdown
                    open={showDropdown.first}
                    label="Property Type"
                    labelStyle={styles.inputLabel}
                    placeholder="Select one"
                    style={[styles.input, { zIndex: 101 }]}
                    setOpen={(e) => { setShowDropdown({ ...showDropdown, first: e }) }}
                    items={PROPERTY_TYPES}
                    value={listingInfo.propertyType}
                    onSelectItem={(item) => { setListingInfo({ ...listingInfo, propertyType: item.value }) }}
                />

                {/* Room Type Input */}
                <Dropdown
                    open={showDropdown.second}
                    label="Room Type"
                    labelStyle={styles.inputLabel}
                    placeholder="Select one"
                    style={[styles.input, { zIndex: 100 }]}
                    setOpen={(e) => { setShowDropdown({ ...showDropdown, second: e }) }}
                    items={ROOM_TYPES}
                    value={listingInfo.roomType}
                    onSelectItem={(item) => { setListingInfo({ ...listingInfo, roomType: item.value }) }}
                />

                {/* Address Input */}
                <Text style={styles.infoHeader}>Location</Text>
                <TextInput
                    style={styles.input}
                    label="Campus"
                    value={listingInfo.campus}
                    onChangeText={(text) => {
                        if (text.length <= 5)
                            setListingInfo({ ...listingInfo, campus: text })
                    }}
                    onFocus={() => setEnableKeyboardAvoiding(true)}
                    onBlur={() => setEnableKeyboardAvoiding(false)}
                />
                <TextInput
                    style={styles.input}
                    label="Street Address"
                    value={listingInfo.address.street}
                    onChangeText={(text) => {
                        if (text.length <= 100) {
                            const { address } = listingInfo;
                            setListingInfo({ ...listingInfo, address: { ...address, street: text } });
                        }
                    }}
                    onFocus={() => setEnableKeyboardAvoiding(true)}
                    onBlur={() => setEnableKeyboardAvoiding(false)}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={[styles.input, { flex: 4 }]}
                        label="City"
                        value={listingInfo.address.city}
                        onChangeText={(text) => {
                            if (text.length <= 50) {
                                const { address } = listingInfo;
                                setListingInfo({ ...listingInfo, address: { ...address, city: text } });
                            }
                        }}
                        onFocus={() => setEnableKeyboardAvoiding(true)}
                        onBlur={() => setEnableKeyboardAvoiding(false)}
                    />
                    <TextInput
                        style={[styles.input, { flex: 1, marginHorizontal: 10 }]}
                        label="State"
                        value={listingInfo.address.state}
                        onChangeText={(text) => {
                            if (text.length <= 2) {
                                const { address } = listingInfo;
                                setListingInfo({ ...listingInfo, address: { ...address, state: text.toUpperCase() } });
                            }
                        }}
                        onFocus={() => setEnableKeyboardAvoiding(true)}
                        onBlur={() => setEnableKeyboardAvoiding(false)}
                    />
                    <TextInput
                        style={[styles.input, { flex: 2 }]}
                        label="ZIP Code"
                        value={listingInfo.address.zip}
                        onChangeText={(text) => {
                            if (text.length <= 5) {
                                const { address } = listingInfo;
                                setListingInfo({ ...listingInfo, address: { ...address, zip: text } });
                            }
                        }}
                        onFocus={() => setEnableKeyboardAvoiding(true)}
                        onBlur={() => setEnableKeyboardAvoiding(false)}
                    />
                </View>
                
                {/* Next Button */}
                <Button
                    style={{ marginBottom: bottom, marginTop: 20 }}
                    title="Next"
                    onPress={onSubmit}
                />
            </KeyboardAvoidingView>
        </Animated.View>
    )
}

export default MainEntry

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
    },
    infoHeader: {
        fontSize: font.medium,
        fontWeight: '500',
        paddingTop: 20,
        textAlign: 'center'
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateInput: {
        flex: 1,
        marginRight: 5
    },
    negotiableContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    negotiableText: {
        fontSize: font.xsmall,
        marginBottom: 5,
    },
    dateField: {
        height: 51,
        padding: 8,
        borderRadius: dimensions.borderRadius,
        borderColor: colors.gray,
        borderWidth: 0.5
    },
    dateLabel: {
        fontSize: 10,
        color: colors.gray,
        marginBottom: 5
    },
    dateDisplay: {
        height: 20,
        fontSize: 14,
        color: '#C0C0C0'
    },
})
