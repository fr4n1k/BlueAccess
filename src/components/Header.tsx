// src/components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConnectionStatus } from '../types';
import { colors, typography, spacing } from '../styles/theme';

interface HeaderProps {
  status: ConnectionStatus;
}

/**
 * Header component displaying app title and connection status
 */
export const Header: React.FC<HeaderProps> = ({ status }) => {
  const getStatusText = () => {
    switch (status) {
      case 'scanning':
        return 'Scanning for devices...';
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection error';
      default:
        return 'Disconnected';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return colors.success;
      case 'error':
        return colors.danger;
      case 'connecting':
      case 'scanning':
        return colors.warning;
      default:
        return colors.text.inverse;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BlueAccess</Text>
      <Text style={[styles.status, { color: getStatusColor() }]}>
        Status: {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  status: {
    ...typography.body,
    fontWeight: '500',
  },
});