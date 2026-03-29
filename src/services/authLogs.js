import apiClient from '../lib/apiClient';

export const authLogsService = {
  getLogs: (params) => apiClient.get('/admin/auth/logs', { params }).then(res => res.data),
  getAnalytics: (params) => apiClient.get('/admin/auth/analytics', { params }).then(res => res.data),
};
