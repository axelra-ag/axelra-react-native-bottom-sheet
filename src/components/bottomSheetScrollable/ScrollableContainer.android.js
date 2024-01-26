import React, { forwardRef } from 'react';
import { GestureDetector, } from 'react-native-gesture-handler';
import BottomSheetRefreshControl from '../bottomSheetRefreshControl';
import { styles } from './styles';
export const ScrollableContainer = forwardRef(function ScrollableContainer({ nativeGesture, refreshControl: _refreshControl, refreshing, progressViewOffset, onRefresh, ScrollableComponent, ...rest }, ref) {
    const Scrollable = (React.createElement(GestureDetector, { gesture: nativeGesture },
        React.createElement(ScrollableComponent, { ref: ref, ...rest })));
    return onRefresh ? (React.createElement(BottomSheetRefreshControl, { refreshing: refreshing, progressViewOffset: progressViewOffset, onRefresh: onRefresh, scrollableGesture: nativeGesture, style: styles.container }, Scrollable)) : (Scrollable);
});
