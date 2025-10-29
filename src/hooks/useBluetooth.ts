// src/hooks/useBluetooth.ts

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { BluetoothDevice as RNBluetoothDevice } from 'react-native-bluetooth-classic';
import { BluetoothService } from '../services/bluetoothService';
import { BluetoothDevice, ConnectionStatus } from '../types';

/**
 * Custom hook for Bluetooth operations
 */
export const useBluetooth = () => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<RNBluetoothDevice | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');

  /**
   * Scans for bonded Bluetooth devices
   */
  const scanDevices = useCallback(async () => {
    try {
      setStatus('scanning');
      const bondedDevices = await BluetoothService.getBondedDevices();
      setDevices(bondedDevices);
      setStatus('disconnected');
    } catch (error) {
      setStatus('error');
      Alert.alert('Error', 'Failed to scan for devices');
      console.error(error);
    }
  }, []);

  /**
   * Connects to a specific device
   */
  const connectToDevice = useCallback(async (device: BluetoothDevice) => {
    try {
      setStatus('connecting');
      const connected = await BluetoothService.connectToDevice(device.id);
      setConnectedDevice(connected);
      setStatus('connected');
    } catch (error) {
      setStatus('error');
      Alert.alert('Connection Error', 'Failed to connect to device');
      console.error(error);
    }
  }, []);

  /**
   * Sends a message to the connected device
   */
  const sendMessage = useCallback(
    async (token: string, deviceId: string) => {
      if (!connectedDevice) {
        Alert.alert('Error', 'No device connected');
        return;
      }

      try {
        await BluetoothService.sendMessage(connectedDevice, {
          token,
          deviceId,
        });
        Alert.alert('Success', 'Token and device ID sent successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to send message');
        console.error(error);
      }
    },
    [connectedDevice],
  );

  /**
   * Disconnects from the current device
   */
  const disconnect = useCallback(async () => {
    if (!connectedDevice) return;

    try {
      await BluetoothService.disconnect(connectedDevice);
      setConnectedDevice(null);
      setStatus('disconnected');
    } catch (error) {
      Alert.alert('Error', 'Failed to disconnect');
      console.error(error);
    }
  }, [connectedDevice]);

  return {
    devices,
    connectedDevice,
    status,
    scanDevices,
    connectToDevice,
    sendMessage,
    disconnect,
  };
};
