import apiClient from '../lib/apiClient';

export const securityService = {
  updateMfaEnforcement: (enabled) => apiClient.patch('/admin/security/mfa-enforcement', { enabled }).then(res => res.data),
};

export const systemService = {
  ping: () => apiClient.get('/ping').then(res => res.data),
};
