import apiClient from '../lib/apiClient';

export const usersService = {
  getUsers: (params) => apiClient.get('/admin/users', { params }).then(res => res.data),
  updateLockStatus: (userId, locked) => apiClient.patch(`/admin/users/${userId}/lock-status`, { locked }).then(res => res.data),
  registerNew: (data) => apiClient.post('/admin/users/register/new', data).then(res => res.data),
  verifyOTP: (data) => apiClient.post('/admin/users/register/verifyOTP', data).then(res => res.data),
  resendOTP: (data) => apiClient.post('/admin/users/register/resendOTP', data).then(res => res.data),
};

