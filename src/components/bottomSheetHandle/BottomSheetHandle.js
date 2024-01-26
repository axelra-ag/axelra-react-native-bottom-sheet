import React, { memo, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
import { DEFAULT_ACCESSIBLE, DEFAULT_ACCESSIBILITY_ROLE, DEFAULT_ACCESSIBILITY_LABEL, DEFAULT_ACCESSIBILITY_HINT, } from './constants';
const BottomSheetHandleComponent = ({ style, indicatorStyle: _indicatorStyle, customIndicatorComponent, children, accessible = DEFAULT_ACCESSIBLE, accessibilityRole = DEFAULT_ACCESSIBILITY_ROLE, accessibilityLabel = DEFAULT_ACCESSIBILITY_LABEL, accessibilityHint = DEFAULT_ACCESSIBILITY_HINT, }) => {
    // styles
    const containerStyle = useMemo(() => [styles.container, ...[Array.isArray(style) ? style : [style]]], [style]);
    const indicatorStyle = useMemo(() => [
        styles.indicator,
        ...[Array.isArray(_indicatorStyle) ? _indicatorStyle : [_indicatorStyle]],
    ], [_indicatorStyle]);
    // render
    return (React.createElement(Animated.View, { style: customIndicatorComponent ? {} : containerStyle, accessible: accessible ?? undefined, accessibilityRole: accessibilityRole ?? undefined, accessibilityLabel: accessibilityLabel ?? undefined, accessibilityHint: accessibilityHint ?? undefined },
        React.createElement(Animated.View, { style: indicatorStyle }),
        children));
};
const BottomSheetHandle = memo(BottomSheetHandleComponent);
BottomSheetHandle.displayName = 'BottomSheetHandle';
export default BottomSheetHandle;
