// external
import { StyleSheet, Text, ActivityIndicator, View, Modal } from 'react-native'
import { useState, useEffect, useRef } from 'react'

// internal
import { colors, font } from '../../../../assets/style-guide'

const LoadingModal = ({ visible = false }) => {
    const [dots, setDots] = useState('')

    const interval = useRef()

    useEffect(() => {
        interval.current = setInterval(() => {
            setDots(dots.length === 3 ? '' : dots + '.')
        }, 500)

        return () => {
            clearInterval(interval.current)
        }
    }, [dots])

    return (
        <Modal visible={visible} transparent >
            <View style={styles.container}>
                <ActivityIndicator animating size='large' color={colors.white} />
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray + '80',
    },
    view: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: 'space-around',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        color: colors.gray,
        fontSize: font.large,
        fontWeight: '600',
    }
})