// external
import { Animated, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react';

// internal
import { ToggledButton, Button } from '../../../Misc/Pressables';
import { colors, font } from '../../../../../assets/style-guide';
import { ALL_PERKS } from '../../../../util/constants';

const PerksEntry = ({ opacity, value, propagateChanges, onSubmit, addedPerks, onAddPerk }) => {
    const { bottom } = useSafeAreaInsets();
    
    const [perks, setPerks] = useState(value);

    useEffect(() => {
        setPerks(value)
    }, [value])

    useEffect(() => {
        propagateChanges({ perks: perks })
    }, [perks])

    const addPerk = (perk, category) => {
        if (!perks[category].includes(perk)) {
            setPerks({ ...perks, [category]: [...perks[category], perk]})
        }
    }

    const removePerk = (perk, category) => {
        setPerks({ ...perks, [category]: perks[category].filter((elem) => (elem != perk))})
    }

    return (
        <Animated.View
            style={{ opacity: opacity }}
            onStartShouldSetResponder={() => true}
        >
            <Text style={styles.caption}>Are there are any perks you want to highlight on your listing page? Tap the bubbles below to select them or add your own.</Text>
            <View style={styles.utilitiesPrompt}>
                <Text style={styles.perksHeader}>Utilities Included?</Text>
                <Switch
                    value={perks["Utilities"].includes('Utilities Included_home-lightning-bolt-outline')}
                    onValueChange={(on) => {
                        if (on) {
                            addPerk('Utilities Included_home-lightning-bolt-outline', 'Utilities')
                        } else {
                            removePerk('Utilities Included_home-lightning-bolt-outline', 'Utilities')
                        }
                    }}
                    trackColor={{ true: colors.primary }}
                />
            </View>
            {Object.keys(ALL_PERKS).map((category) => (
                <View key={category}>
                    <View style={styles.perksHeaderContainer}>
                        <Text style={styles.perksHeader}>{category}</Text>
                    </View>
                    <View style={styles.togglerContainer}>
                        {/* Pre-Added Perks */}
                        {ALL_PERKS[category].map(({ title, icon }) => (
                            <ToggledButton
                                style={styles.toggler}
                                title={title}
                                key={`${title}_${icon}`}
                                value={perks[category].includes(`${title}_${icon}`)}
                                onPress={(toggled) => {
                                    if (toggled) {
                                        addPerk(`${title}_${icon}`, category)
                                    } else {
                                        removePerk(`${title}_${icon}`, category)
                                    }
                                }}
                            />
                        ))}
                        {/* User-Added Perks */}
                        {addedPerks[category].map(({ title, val }) => {
                            return (
                            <ToggledButton
                                style={styles.toggler}
                                title={title}
                                key={val}
                                value={perks[category].includes(val)}
                                onPress={(toggled) => {
                                    if (toggled) {
                                        addPerk(val, category)
                                    } else {
                                        removePerk(val, category)
                                    }
                                }}
                            />
                        )})}
                        {/* Add Perks Button */}
                        <TouchableOpacity
                            style={[styles.addPerkButton, styles.toggler]}
                            onPress={() => onAddPerk(category)}
                        >
                            <Text style={{ color: colors.success }}>
                                Add +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            
            <Button
                style={{ marginBottom: bottom, marginTop: 20 }}
                title="Next"
                onPress={onSubmit}
            />
        </Animated.View>
    )
}

export default PerksEntry

const styles = StyleSheet.create({
    utilitiesPrompt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    caption: {
        marginTop: 10,
        fontSize: font.medium,
        fontWeight: '300',
        lineHeight: 20,
    },
    togglerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    toggler: {
        marginRight: 5,
        marginBottom: 5
    },
    perksHeader: {
        fontSize: font.medium,
        fontWeight: '200',
    },
    perksHeaderContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray,
        paddingBottom: 3,
        marginBottom: 8,
        marginTop: 10,
    },
    addPerkButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: '50%',
        borderColor: colors.success,
    },
})