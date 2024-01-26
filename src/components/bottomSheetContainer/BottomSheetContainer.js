import React, { memo, useCallback, useMemo, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { WINDOW_HEIGHT } from '../../constants';
import { print } from '../../utilities';
import { styles } from './styles';
import { StatusBar, } from 'react-native';
function BottomSheetContainerComponent({ containerHeight, containerOffset, topInset = 0, bottomInset = 0, shouldCalculateHeight = true, detached, style, children, }) {
    const containerRef = useRef(null);
    //#region styles
    const containerStyle = useMemo(() => [
        style,
        styles.container,
        {
            top: topInset,
            bottom: bottomInset,
            overflow: detached ? 'visible' : 'hidden',
        },
    ], [style, detached, topInset, bottomInset]);
    //#endregion
    //#region callbacks
    const handleContainerLayout = useCallback(function handleContainerLayout({ nativeEvent: { layout: { height }, }, }) {
        containerHeight.value = height;
        containerRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
            containerOffset.value = {
                top: pageY ?? 0,
                left: 0,
                right: 0,
                bottom: Math.max(0, WINDOW_HEIGHT -
                    ((pageY ?? 0) + height + (StatusBar.currentHeight ?? 0))),
            };
        });
        print({
            component: BottomSheetContainer.displayName,
            method: 'handleContainerLayout',
            params: {
                height,
            },
        });
    }, [containerHeight, containerOffset, containerRef]);
    //#endregion
    //#region render
    return (React.createElement(Animated.View, { ref: containerRef, 
        // @ts-ignore
        style: containerStyle, pointerEvents: "box-none", onLayout: shouldCalculateHeight ? handleContainerLayout : undefined, children: children }));
    //#endregion
}
const BottomSheetContainer = memo(BottomSheetContainerComponent);
BottomSheetContainer.displayName = 'BottomSheetContainer';
export default BottomSheetContainer;