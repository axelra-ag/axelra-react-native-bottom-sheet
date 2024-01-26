import React, { memo, useContext, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { BottomSheetDraggableContext } from '../../contexts/gesture';
import { SCROLLABLE_STATE } from '../../constants';
import { useBottomSheetInternal } from '../../hooks';
const AnimatedRefreshControl = Animated.createAnimatedComponent(RefreshControl);
function BottomSheetRefreshControlComponent({ onRefresh, scrollableGesture, ...rest }) {
    //#region hooks
    const draggableGesture = useContext(BottomSheetDraggableContext);
    const { animatedScrollableState } = useBottomSheetInternal();
    //#endregion
    //#region variables
    const animatedProps = useAnimatedProps(() => ({
        enabled: animatedScrollableState.value === SCROLLABLE_STATE.UNLOCKED,
    }));
    const gesture = useMemo(() => Gesture.Simultaneous(Gesture.Native().shouldCancelWhenOutside(false), scrollableGesture, draggableGesture), [draggableGesture, scrollableGesture]);
    //#endregion
    // render
    return (React.createElement(GestureDetector, { gesture: gesture },
        React.createElement(AnimatedRefreshControl, { ...rest, onRefresh: onRefresh, animatedProps: animatedProps })));
}
const BottomSheetRefreshControl = memo(BottomSheetRefreshControlComponent);
BottomSheetRefreshControl.displayName = 'BottomSheetRefreshControl';
export default BottomSheetRefreshControl;
