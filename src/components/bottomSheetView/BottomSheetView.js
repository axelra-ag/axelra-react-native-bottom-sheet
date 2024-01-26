import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { SCROLLABLE_TYPE } from '../../constants';
import { useBottomSheetInternal } from '../../hooks';
import { print } from '../../utilities';
function BottomSheetViewComponent({ focusHook: useFocusHook = useEffect, enableFooterMarginAdjustment = false, onLayout, style, children, ...rest }) {
    //#region hooks
    const { animatedScrollableContentOffsetY, animatedScrollableType, animatedFooterHeight, enableDynamicSizing, animatedContentHeight, } = useBottomSheetInternal();
    //#endregion
    //#region styles
    const flattenContainerStyle = useMemo(() => StyleSheet.flatten(style), [style]);
    const containerStylePaddingBottom = useMemo(() => {
        const paddingBottom = flattenContainerStyle && 'paddingBottom' in flattenContainerStyle
            ? flattenContainerStyle.paddingBottom
            : 0;
        return typeof paddingBottom === 'number' ? paddingBottom : 0;
    }, [flattenContainerStyle]);
    const containerStyle = useMemo(() => {
        return {
            ...flattenContainerStyle,
            paddingBottom: 0,
        };
    }, [flattenContainerStyle]);
    const spaceStyle = useAnimatedStyle(() => ({
        opacity: 0,
        height: enableFooterMarginAdjustment
            ? animatedFooterHeight.value + containerStylePaddingBottom
            : containerStylePaddingBottom,
    }), [
        enableFooterMarginAdjustment,
        containerStylePaddingBottom,
        animatedFooterHeight,
    ]);
    //#endregion
    //#region callbacks
    const handleSettingScrollable = useCallback(() => {
        animatedScrollableContentOffsetY.value = 0;
        animatedScrollableType.value = SCROLLABLE_TYPE.VIEW;
    }, [animatedScrollableContentOffsetY, animatedScrollableType]);
    const handleLayout = useCallback((event) => {
        if (enableDynamicSizing) {
            animatedContentHeight.value = event.nativeEvent.layout.height;
        }
        if (onLayout) {
            onLayout(event);
        }
        print({
            component: BottomSheetView.displayName,
            method: 'handleLayout',
            params: {
                height: event.nativeEvent.layout.height,
            },
        });
    }, [onLayout, animatedContentHeight, enableDynamicSizing]);
    //#endregion
    // effects
    useFocusHook(handleSettingScrollable);
    //render
    return (React.createElement(Animated.View, { onLayout: handleLayout, style: containerStyle, ...rest },
        children,
        React.createElement(Animated.View, { pointerEvents: "none", style: spaceStyle })));
}
const BottomSheetView = memo(BottomSheetViewComponent);
BottomSheetView.displayName = 'BottomSheetView';
export default BottomSheetView;
