import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useRef } from "react"

//skeleton UI component
//for creating skeleton UI parts for loading UI

const AniLimGrad = Animated.createAnimatedComponent(LinearGradient)

const SkeletonComponent = (props) => {
    const animatedVal = useRef(new Animated.Value(0)).current

    const isAbsolute = props.isAbsolute
    const top = props.topVal
    const left = props.leftVal
    const borderColor = props.borderColor
    const borderWidth = props.borderWidth

    useEffect(() => {
        //runs animation and loops it
        Animated.loop(
            Animated.timing(animatedVal, {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut(Easing.linear),
                useNativeDriver: true
            })
        ).start()
    })

    const translateX = animatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [-props.width, props.width]
    })

    return (
        <View style={{
            backgroundColor: '#a0a0a0',
            height: props.height,
            width: props.width,
            overflow: 'hidden',
            position: isAbsolute == undefined ? "relative" : "absolute",
            top: top == undefined ? 0 : top,
            left: left == undefined ? 0 : left,
            borderColor: borderColor == undefined ? null : borderColor,
            borderWidth: borderWidth == undefined ? null : borderWidth
        }}>
            {/* the animated gradient */}
            <AniLimGrad
                colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateX: translateX }]
                }}
            />
        </View >
    )
}

export default SkeletonComponent