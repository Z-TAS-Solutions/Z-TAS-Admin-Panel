import { useState, useEffect } from 'react';

/**
 * Hook to determine if the user's current device is marked as trusted.
 * 
 * @returns {object} Device trust status and a setter to update it.
 */
export function useDeviceTrust() {
  const [isTrusted, setIsTrusted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock checking device fingerprint from local storage or API
    const checkTrustStatus = async () => {
      setIsLoading(true);
      try {
        const storedStatus = localStorage.getItem('device_trust_status');
        setIsTrusted(storedStatus === 'true');
      } catch (e) {
        console.error('Failed to check device trust:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkTrustStatus();
  }, []);

  const markDeviceAsTrusted = () => {
    localStorage.setItem('device_trust_status', 'true');
    setIsTrusted(true);
  };

  return { isTrusted, isLoading, markDeviceAsTrusted };
}
// device trust hook added
