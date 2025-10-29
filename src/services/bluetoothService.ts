// src/services/bluetoothService.ts

import RNBluetoothClassic, {
  BluetoothDevice as RNBluetoothDevice,
} from 'react-native-bluetooth-classic';
import { BluetoothDevice, ArduinoMessage } from '../types';

/**
 * Service for handling Bluetooth operations
 */
export class BluetoothService {
  /**
   * Gets list of bonded (paired) Bluetooth devices
   * @returns Promise<BluetoothDevice[]>
   */
  static async getBondedDevices(): Promise<BluetoothDevice[]> {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      return devices.map(device => ({
        id: device.id,
        name: device.name || 'Unknown Device',
        address: device.address,
      }));
    } catch (error) {
      console.error('Error getting bonded devices:', error);
      throw new Error('Failed to retrieve paired devices');
    }
  }

  /**
   * Connects to a Bluetooth device
   * @param deviceId The device ID to connect to
   * @returns Promise<RNBluetoothDevice>
   */
  static async connectToDevice(deviceId: string): Promise<RNBluetoothDevice> {
    try {
      const device = await RNBluetoothClassic.connectToDevice(deviceId);
      return device;
    } catch (error) {
      console.error('Error connecting to device:', error);
      throw new Error('Failed to connect to device');
    }
  }

  /**
   * Sends token and device ID to Arduino
   * @param device The connected device
   * @param message The message containing token and device ID
   */
  static async sendMessage(
    device: RNBluetoothDevice,
    message: ArduinoMessage,
  ): Promise<void> {
    try {
      const payload = `${message.token}|${message.deviceId}\n`;
      await device.write(payload);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  /**
   * Disconnects from a Bluetooth device
   * @param device The device to disconnect from
   */
  static async disconnect(device: RNBluetoothDevice): Promise<void> {
    try {
      await device.disconnect();
    } catch (error) {
      console.error('Error disconnecting:', error);
      throw new Error('Failed to disconnect');
    }
  }
}
