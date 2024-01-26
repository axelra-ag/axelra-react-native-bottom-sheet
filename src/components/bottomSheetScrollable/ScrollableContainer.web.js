import React, { forwardRef, useCallback } from 'react';
import { GestureDetector, } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
export const ScrollableContainer = forwardRef(function ScrollableContainer({ nativeGesture, ScrollableComponent, animatedProps, ...rest }, ref) {
    const renderScrollComponent = useCallback((props) => (React.createElement(Animated.ScrollView, { ...props, animatedProps: animatedProps })), [animatedProps]);
    return (React.createElement(GestureDetector, { gesture: nativeGesture },
        React.createElement(ScrollableComponent, { ref: ref, ...rest, renderScrollComponent: renderScrollComponent })));
});
