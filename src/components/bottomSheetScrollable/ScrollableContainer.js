import React, { forwardRef } from 'react';
import { GestureDetector, } from 'react-native-gesture-handler';
export const ScrollableContainer = forwardRef(function ScrollableContainer({ nativeGesture, ScrollableComponent, ...rest }, ref) {
    return (React.createElement(GestureDetector, { gesture: nativeGesture },
        React.createElement(ScrollableComponent, { ref: ref, ...rest })));
});
