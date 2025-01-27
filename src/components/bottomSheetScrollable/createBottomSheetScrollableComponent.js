import React, { forwardRef, useContext, useImperativeHandle, useMemo, } from 'react';
import { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { BottomSheetDraggableContext } from '../../contexts/gesture';
import { useScrollHandler, useScrollableSetter, useBottomSheetInternal, useStableCallback, } from '../../hooks';
import { SCROLLABLE_DECELERATION_RATE_MAPPER, SCROLLABLE_STATE, } from '../../constants';
import { ScrollableContainer } from './ScrollableContainer';
export function createBottomSheetScrollableComponent(type, ScrollableComponent) {
    return forwardRef((props, ref) => {
        // props
        const { 
        // hooks
        focusHook, scrollEventsHandlersHook, 
        // props
        enableFooterMarginAdjustment = false, overScrollMode = 'never', keyboardDismissMode = 'interactive', showsVerticalScrollIndicator = true, style, refreshing, onRefresh, progressViewOffset, refreshControl, 
        // events
        onScroll, onScrollBeginDrag, onScrollEndDrag, onContentSizeChange, ...rest } = props;
        //#region hooks
        const draggableGesture = useContext(BottomSheetDraggableContext);
        const { scrollableRef, scrollableContentOffsetY, scrollHandler } = useScrollHandler(scrollEventsHandlersHook, onScroll, onScrollBeginDrag, onScrollEndDrag);
        const { animatedFooterHeight, animatedContentHeight, animatedScrollableState, enableDynamicSizing, } = useBottomSheetInternal();
        //#endregion
        //#region variables
        const scrollableAnimatedProps = useAnimatedProps(() => ({
            decelerationRate: SCROLLABLE_DECELERATION_RATE_MAPPER[animatedScrollableState.value],
            showsVerticalScrollIndicator: showsVerticalScrollIndicator
                ? animatedScrollableState.value === SCROLLABLE_STATE.UNLOCKED
                : showsVerticalScrollIndicator,
        }), [animatedScrollableState, showsVerticalScrollIndicator]);
        const nativeGesture = useMemo(() => Gesture.Native()
            // @ts-ignore
            .simultaneousWithExternalGesture(draggableGesture)
            .shouldCancelWhenOutside(false), [draggableGesture]);
        //#endregion
        //#region callbacks
        const handleContentSizeChange = useStableCallback((contentWidth, contentHeight) => {
            if (enableDynamicSizing) {
                animatedContentHeight.value = contentHeight;
            }
            if (onContentSizeChange) {
                onContentSizeChange(contentWidth, contentHeight);
            }
        });
        //#endregion
        //#region styles
        const containerAnimatedStyle = useAnimatedStyle(() => ({
            marginBottom: enableFooterMarginAdjustment
                ? animatedFooterHeight.value
                : 0,
        }), [enableFooterMarginAdjustment]);
        const containerStyle = useMemo(() => {
            return enableFooterMarginAdjustment
                ? [
                    ...(style ? ('length' in style ? style : [style]) : []),
                    containerAnimatedStyle,
                ]
                : style;
        }, [enableFooterMarginAdjustment, style, containerAnimatedStyle]);
        //#endregion
        //#region effects
        // @ts-ignore
        useImperativeHandle(ref, () => scrollableRef.current);
        useScrollableSetter(scrollableRef, type, scrollableContentOffsetY, onRefresh !== undefined, focusHook);
        //#endregion
        //#region render
        return (React.createElement(ScrollableContainer, { ref: scrollableRef, nativeGesture: nativeGesture, animatedProps: scrollableAnimatedProps, overScrollMode: overScrollMode, keyboardDismissMode: keyboardDismissMode, refreshing: refreshing, scrollEventThrottle: 16, progressViewOffset: progressViewOffset, style: containerStyle, onRefresh: onRefresh, onScroll: scrollHandler, onContentSizeChange: handleContentSizeChange, ScrollableComponent: ScrollableComponent, refreshControl: refreshControl, ...rest }));
        //#endregion
    });
}
