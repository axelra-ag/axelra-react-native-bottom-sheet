import { findNodeHandle } from 'react-native';
export function getRefNativeTag(ref) {
    return findNodeHandle(ref?.current) || null;
}