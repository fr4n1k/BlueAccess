// src/App.tsx

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './components/Header';
import { DeviceList } from './components/DeviceList';
import { ConnectionPanel } from './components/ConnectionPanel';
import { useBluetooth } from './hooks/useBluetooth';
import { useDeviceId } from './hooks/useDeviceId';
import { usePermissions } from './hooks/usePermissions';
import { colors, spacing, borderRadius, typography } from './styles/theme';

/**
 * Main application component
 */
const App: React.FC = () => {
  // Request permissions on mount
  usePermissions();

  // Get unique device ID
  const { deviceId } = useDeviceId();

  // Bluetooth operations
  const {
    devices,
    connectedDevice,
    status,
    scanDevices,
    connectToDevice,
    sendMessage,
    disconnect,
  } = useBluetooth();

  const handleSendToken = async (token: string) => {
    if (deviceId) {
      await sendMessage(token, deviceId);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Header status={status} />

      {!connectedDevice ? (
        <>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={scanDevices}
            activeOpacity={0.8}
          >
            <Text style={styles.scanButtonText}>Scan for Paired Devices</Text>
          </TouchableOpacity>

          <DeviceList devices={devices} onDevicePress={connectToDevice} />
        </>
      ) : (
        <ConnectionPanel
          deviceName={connectedDevice.name || 'Unknown Device'}
          onSendToken={handleSendToken}
          onDisconnect={disconnect}
        />
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scanButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    margin: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  scanButtonText: {
    ...typography.body,
    color: colors.text.inverse,
    fontWeight: '600',
  },
});

export default App;
