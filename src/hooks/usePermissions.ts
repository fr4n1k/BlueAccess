// src/hooks/usePermissions.ts

import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

/**
 * Custom hook to request Android Bluetooth permissions
 */
export const usePermissions = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidPermissions();
    }
  }, []);

  const requestAndroidPermissions = async () => {
    try {
      // Platform.Version can be string or number, so we handle both cases
      const version =
        typeof Platform.Version === 'string'
          ? parseInt(Platform.Version, 10)
          : Platform.Version;

      if (version >= 23) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allPermissionsGranted = Object.values(granted).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (!allPermissionsGranted) {
          console.warn('Some permissions were not granted');
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };
};
