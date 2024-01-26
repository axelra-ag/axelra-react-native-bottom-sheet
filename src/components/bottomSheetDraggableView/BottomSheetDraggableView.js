import React, { useMemo, memo } from 'react';
import Animated from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useBottomSheetGestureHandlers, useBottomSheetInternal, } from '../../hooks';
import { BottomSheetDraggableContext } from '../../contexts/gesture';
const BottomSheetDraggableViewComponent = ({ nativeGestureRef, refreshControlGestureRef, style, children, ...rest }) => {
    //#region hooks
    const { enableContentPanningGesture, simultaneousHandlers: _providedSimultaneousHandlers, waitFor, activeOffsetX, activeOffsetY, failOffsetX, failOffsetY, } = useBottomSheetInternal();
    const { contentPanGestureHandler } = useBottomSheetGestureHandlers();
    //#endregion
    //#region variables
    const simultaneousHandlers = useMemo(() => {
        const refs = [];
        if (nativeGestureRef) {
            refs.push(nativeGestureRef);
        }
        if (refreshControlGestureRef) {
            refs.push(refreshControlGestureRef);
        }
        if (_providedSimultaneousHandlers) {
            if (Array.isArray(_providedSimultaneousHandlers)) {
                refs.push(..._providedSimultaneousHandlers);
            }
            else {
                refs.push(_providedSimultaneousHandlers);
            }
        }
        return refs;
    }, [
        _providedSimultaneousHandlers,
        nativeGestureRef,
        refreshControlGestureRef,
    ]);
    const draggableGesture = useMemo(() => {
        let gesture = Gesture.Pan()
            .enabled(enableContentPanningGesture)
            .shouldCancelWhenOutside(false)
            .runOnJS(false)
            .onStart(contentPanGestureHandler.handleOnStart)
            .onChange(contentPanGestureHandler.handleOnChange)
            .onEnd(contentPanGestureHandler.handleOnEnd)
            .onFinalize(contentPanGestureHandler.handleOnFinalize);
        if (waitFor) {
            gesture = gesture.requireExternalGestureToFail(waitFor);
        }
        if (simultaneousHandlers) {
            gesture = gesture.simultaneousWithExternalGesture(simultaneousHandlers);
        }
        if (activeOffsetX) {
            gesture = gesture.activeOffsetX(activeOffsetX);
        }
        if (activeOffsetY) {
            gesture = gesture.activeOffsetY(activeOffsetY);
        }
        if (failOffsetX) {
            gesture = gesture.failOffsetX(failOffsetX);
        }
        if (failOffsetY) {
            gesture = gesture.failOffsetY(failOffsetY);
        }
        return gesture;
    }, [
        activeOffsetX,
        activeOffsetY,
        enableContentPanningGesture,
        failOffsetX,
        failOffsetY,
        simultaneousHandlers,
        waitFor,
        contentPanGestureHandler.handleOnChange,
        contentPanGestureHandler.handleOnEnd,
        contentPanGestureHandler.handleOnFinalize,
        contentPanGestureHandler.handleOnStart,
    ]);
    //#endregion
    return (React.createElement(GestureDetector, { gesture: draggableGesture },
        React.createElement(BottomSheetDraggableContext.Provider, { value: draggableGesture },
            React.createElement(Animated.View, { style: style, ...rest }, children))));
};
const BottomSheetDraggableView = memo(BottomSheetDraggableViewComponent);
BottomSheetDraggableView.displayName = 'BottomSheetDraggableView';
export default BottomSheetDraggableView;
