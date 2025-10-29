// src/components/DeviceItem.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BluetoothDevice } from '../types';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

interface DeviceItemProps {
  device: BluetoothDevice;
  onPress: (device: BluetoothDevice) => void;
}

/**
 * Component representing a single Bluetooth device in the list
 */
export const DeviceItem: React.FC<DeviceItemProps> = ({ device, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(device)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{device.name || 'Unknown Device'}</Text>
        <Text style={styles.id}>{device.id}</Text>
      </View>
      <View style={styles.indicator} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  id: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    marginLeft: spacing.md,
  },
});