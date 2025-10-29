// src/services/storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const DEVICE_ID_KEY = 'unique_device_id';

/**
 * Storage service for managing device identification
 */
export class StorageService {
  /**
   * Gets or creates a unique device ID
   * @returns Promise<string> The unique device ID
   */
  static async getOrCreateDeviceId(): Promise<string> {
    try {
      let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

      if (!deviceId) {
        deviceId = uuid.v4() as string;
        await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
      }

      return deviceId;
    } catch (error) {
      console.error('Error managing device ID:', error);
      throw new Error('Failed to get device ID');
    }
  }

  /**
   * Clears the stored device ID
   */
  static async clearDeviceId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(DEVICE_ID_KEY);
    } catch (error) {
      console.error('Error clearing device ID:', error);
    }
  }
}
