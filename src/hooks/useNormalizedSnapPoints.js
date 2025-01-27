import { useDerivedValue, useSharedValue, } from 'react-native-reanimated';
import { normalizeSnapPoint } from '../utilities';
import { INITIAL_CONTAINER_HEIGHT, INITIAL_HANDLE_HEIGHT, INITIAL_SNAP_POINT, } from '../components/bottomSheet/constants';
/**
 * Convert percentage snap points to pixels in screen and calculate
 * the accurate snap points positions.
 * @param snapPoints provided snap points.
 * @param containerHeight BottomSheetContainer height.
 * @param contentHeight content size.
 * @param handleHeight handle size.
 * @param enableDynamicSizing
 * @param maxDynamicContentSize
 * @returns {Animated.SharedValue<number[]>}
 */
export const useNormalizedSnapPoints = (snapPoints, containerHeight, contentHeight, handleHeight, enableDynamicSizing, maxDynamicContentSize) => {
    const dynamicSnapPointIndex = useSharedValue(-1);
    const normalizedSnapPoints = useDerivedValue(() => {
        // early exit, if container layout is not ready
        const isContainerLayoutReady = containerHeight.value !== INITIAL_CONTAINER_HEIGHT;
        if (!isContainerLayoutReady) {
            return [INITIAL_SNAP_POINT];
        }
        // extract snap points from provided props
        const _snapPoints = snapPoints
            ? 'value' in snapPoints
                ? snapPoints.value
                : snapPoints
            : [];
        // normalized all provided snap points, converting percentage
        // values into absolute values.
        let _normalizedSnapPoints = _snapPoints.map(snapPoint => normalizeSnapPoint(snapPoint, containerHeight.value));
        // return normalized snap points if dynamic sizing is not enabled
        if (!enableDynamicSizing) {
            return _normalizedSnapPoints;
        }
        // early exit, if handle height is not calculated yet.
        if (handleHeight.value === INITIAL_HANDLE_HEIGHT) {
            return [INITIAL_SNAP_POINT];
        }
        // early exit, if content height is not calculated yet.
        if (contentHeight.value === INITIAL_CONTAINER_HEIGHT) {
            return [INITIAL_SNAP_POINT];
        }
        // calculate a new snap point based on content height.
        const dynamicSnapPoint = containerHeight.value -
            Math.min(contentHeight.value + handleHeight.value, maxDynamicContentSize !== undefined
                ? maxDynamicContentSize
                : containerHeight.value);
        // push dynamic snap point into the normalized snap points.
        _normalizedSnapPoints.push(dynamicSnapPoint);
        // sort all snap points.
        _normalizedSnapPoints = _normalizedSnapPoints.sort((a, b) => b - a);
        // locate the dynamic snap point index.
        dynamicSnapPointIndex.value =
            _normalizedSnapPoints.indexOf(dynamicSnapPoint);
        return _normalizedSnapPoints;
    }, [snapPoints, enableDynamicSizing, maxDynamicContentSize]);
    return [normalizedSnapPoints, dynamicSnapPointIndex];
};
