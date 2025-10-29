// src/components/DeviceList.tsx

import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { DeviceItem } from './DeviceItem';
import { BluetoothDevice } from '../types';
import { colors, typography, spacing } from '../styles/theme';

interface DeviceListProps {
  devices: BluetoothDevice[];
  onDevicePress: (device: BluetoothDevice) => void;
}

/**
 * Component displaying list of available Bluetooth devices
 */
export const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  onDevicePress,
}) => {
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No paired devices found</Text>
      <Text style={styles.emptyHint}>
        Pair a Bluetooth device in your phone settings first
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: BluetoothDevice }) => (
    <DeviceItem device={item} onPress={onDevicePress} />
  );

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.subtitle,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyHint: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});