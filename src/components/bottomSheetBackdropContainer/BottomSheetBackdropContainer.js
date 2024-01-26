import React, { memo } from 'react';
import { styles } from './styles';
const BottomSheetBackdropContainerComponent = ({ animatedIndex, animatedPosition, backdropComponent: BackdropComponent, }) => {
    return BackdropComponent ? (React.createElement(BackdropComponent, { animatedIndex: animatedIndex, animatedPosition: animatedPosition, style: styles.container })) : null;
};
const BottomSheetBackdropContainer = memo(BottomSheetBackdropContainerComponent);
BottomSheetBackdropContainer.displayName = 'BottomSheetBackdropContainer';
export default BottomSheetBackdropContainer;
