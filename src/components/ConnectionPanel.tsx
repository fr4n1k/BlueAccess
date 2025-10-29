// src/components/ConnectionPanel.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

interface ConnectionPanelProps {
  deviceName: string;
  onSendToken: (token: string) => void;
  onDisconnect: () => void;
}

/**
 * Panel displayed when connected to a device
 */
export const ConnectionPanel: React.FC<ConnectionPanelProps> = ({
  deviceName,
  onSendToken,
  onDisconnect,
}) => {
  const [token, setToken] = useState('');

  const handleSend = () => {
    if (token.trim()) {
      onSendToken(token);
      setToken(''); // Clear input after sending
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Connected to</Text>
          <Text style={styles.deviceName}>{deviceName}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Access Token</Text>
          <TextInput
            style={styles.input}
            value={token}
            onChangeText={setToken}
            placeholder="Enter your access token"
            placeholderTextColor={colors.text.tertiary}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !token.trim() && styles.buttonDisabled]}
          onPress={handleSend}
          activeOpacity={0.8}
          disabled={!token.trim()}
        >
          <Text style={styles.buttonText}>Send Token</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.disconnectButton]}
          onPress={onDisconnect}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  statusCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  statusLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  deviceName: {
    ...typography.subtitle,
    color: colors.text.primary,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...typography.body,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.text.tertiary,
    opacity: 0.5,
  },
  buttonText: {
    ...typography.body,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  disconnectButton: {
    backgroundColor: colors.danger,
  },
});