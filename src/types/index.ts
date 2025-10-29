// src/types/index.ts

/**
 * Represents a Bluetooth device
 */
export interface BluetoothDevice {
  id: string;
  name: string;
  address?: string;
}

/**
 * Connection status states
 */
export type ConnectionStatus =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'error';

/**
 * Message to send to Arduino
 */
export interface ArduinoMessage {
  token: string;
  deviceId: string;
}

/**
 * App state interface
 */
export interface AppState {
  devices: BluetoothDevice[];
  connectedDevice: BluetoothDevice | null;
  status: ConnectionStatus;
  token: string;
}
