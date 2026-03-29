import apiClient from '../lib/apiClient';

export const usersService = {
  getUsers: (params) => apiClient.get('/admin/users', { params }).then(res => res.data),
  updateLockStatus: (userId, locked) => apiClient.patch(`/admin/users/${userId}/lock-status`, { locked }).then(res => res.data),
};
