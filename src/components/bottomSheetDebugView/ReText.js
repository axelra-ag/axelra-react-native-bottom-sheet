import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, } from 'react-native-reanimated';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({ text: true });
const ReText = (props) => {
    const { text, value: _providedValue, style } = { style: {}, ...props };
    const providedValue = useDerivedValue(() => typeof _providedValue === 'number'
        ? _providedValue
        : typeof _providedValue.value === 'number'
            ? _providedValue.value.toFixed(2)
            : _providedValue.value, [_providedValue]);
    const animatedProps = useAnimatedProps(() => {
        return {
            text: `${text}: ${providedValue.value}`,
        };
    }, [text, providedValue]);
    return (React.createElement(AnimatedTextInput, { underlineColorAndroid: "transparent", editable: false, value: `${text}: ${providedValue.value}`, style: style, 
        // @ts-ignore
        animatedProps: animatedProps }));
};
export default ReText;
