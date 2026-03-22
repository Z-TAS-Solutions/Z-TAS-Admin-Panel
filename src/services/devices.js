import apiClient from '../lib/apiClient';

export const devicesService = {
  getDevices: (params) => apiClient.get('/admin/devices', { params }).then(res => res.data),
  forceLogout: (deviceId) => apiClient.post(`/admin/devices/${deviceId}/force-logout`).then(res => res.data),
};
