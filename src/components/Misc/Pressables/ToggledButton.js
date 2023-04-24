// external
import { StyleSheet, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

// internal
import { colors } from '../../../../assets/style-guide'

const untoggledColor = colors.gray
const toggledColor = colors.primary

const ToggledButton = ({ style, title, onPress, value }) => {
    const [toggled, setToggled] = useState(value)

    useEffect(() => {
        setToggled(value)
    }, [value])

    return (
        <Pressable
            style={[
                styles.container,
                style,
                toggled && { borderColor: toggledColor }
            ]}
            onPress={() => {
                if (onPress) { onPress(!toggled); }
                setToggled(!toggled);
            }}
        >
            <Text style={[
                styles.text,
                toggled && { color: toggledColor }
            ]}>
                {title}
            </Text>
        </Pressable>
    );
}

export default ToggledButton

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderWidth: 1,
        borderRadius: '50%',
        borderColor: untoggledColor,
    },
    text: {
        color: untoggledColor
    }
})