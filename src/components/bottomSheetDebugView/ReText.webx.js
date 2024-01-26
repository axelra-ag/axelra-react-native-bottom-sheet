import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedReaction, useDerivedValue, } from 'react-native-reanimated';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const ReText = (props) => {
    const { text, value: _providedValue, style } = { style: {}, ...props };
    const textRef = useRef(null);
    const providedValue = useDerivedValue(() => {
        const value = typeof _providedValue === 'number'
            ? _providedValue
            : typeof _providedValue.value === 'number'
                ? _providedValue.value.toFixed(2)
                : _providedValue.value;
        return `${text}: ${value}`;
    });
    //region effects
    useAnimatedReaction(() => providedValue.value, result => {
        textRef.current?.setNativeProps({
            text: result,
        });
    });
    //endregion
    return (React.createElement(AnimatedTextInput, { ref: textRef, underlineColorAndroid: "transparent", editable: false, value: providedValue.value, style: style }));
};
export default ReText;
