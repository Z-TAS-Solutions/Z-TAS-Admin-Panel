import apiClient from '../lib/apiClient';

export const dashboardService = {
  getAnalytics: () => apiClient.get('/admin/dashboard/analytics').then(res => res.data),
  getAuthTrends: (params) => apiClient.get('/admin/dashboard/auth-trends', { params }).then(res => res.data),
  getRecentActivity: (params) => apiClient.get('/admin/dashboard/recent-auth-activity', { params }).then(res => res.data),
};
