// src/hooks/useDeviceId.ts

import { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

/**
 * Custom hook to manage unique device ID
 * @returns The device ID or null if not yet loaded
 */
export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeviceId();
  }, []);

  const loadDeviceId = async () => {
    try {
      const id = await StorageService.getOrCreateDeviceId();
      setDeviceId(id);
    } catch (error) {
      console.error('Failed to load device ID:', error);
    } finally {
      setLoading(false);
    }
  };

  return { deviceId, loading };
};
