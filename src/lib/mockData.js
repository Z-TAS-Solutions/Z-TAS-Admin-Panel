// src/lib/mockData.js

export const mockEndpoints = [
  {
    method: 'GET',
    pattern: /^\/admin\/dashboard\/analytics$/,
    response: {
      totalUsers: 12543,
      activeSessions: 342,
      successRate: 97.5,
      failedRate: 2.5,
      suspiciousActivity: 14
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/dashboard\/auth-trends$/,
    response: {
      interval: "hour",
      data: [
        { timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), successCount: 120, failureCount: 5 },
        { timestamp: new Date(Date.now() - 4 * 3600000).toISOString(), successCount: 150, failureCount: 2 },
        { timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), successCount: 110, failureCount: 8 },
        { timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), successCount: 98, failureCount: 12 },
        { timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), successCount: 200, failureCount: 3 },
        { timestamp: new Date().toISOString(), successCount: 180, failureCount: 1 },
      ]
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/dashboard\/recent-auth-activity$/,
    response: {
      page: 1, limit: 10, total: 245,
      data: [
        { userId: "USR-8492", device: "MacBook Pro", method: "passkey", status: "success", timestamp: new Date(Date.now() - 60000).toISOString() },
        { userId: "USR-7341", device: "Samsung Galaxy S24", method: "otp", status: "success", timestamp: new Date(Date.now() - 120000).toISOString() },
        { userId: "USR-6629", device: "Windows Chrome", method: "password", status: "failure", timestamp: new Date(Date.now() - 180000).toISOString() },
        { userId: "USR-9012", device: "iPhone 15", method: "passkey", status: "success", timestamp: new Date(Date.now() - 240000).toISOString() },
        { userId: "USR-4521", device: "Linux Firefox", method: "oauth", status: "success", timestamp: new Date(Date.now() - 300000).toISOString() },
      ]
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/users$/,
    response: {
      limit: 20, offset: 0, total: 1342,
      data: [
        { userId: "USR-8492", name: "Sarah Mitchell", email: "sarah@example.com", phone: "+94 771234567", mfaEnabled: true, lastLogin: new Date(Date.now() - 300000).toISOString(), status: "active" },
        { userId: "USR-7341", name: "James Rodriguez", email: "james@example.com", phone: "+94 771234568", mfaEnabled: true, lastLogin: new Date(Date.now() - 86400000).toISOString(), status: "active" },
        { userId: "USR-6629", name: "Emily Chen", email: "emily@example.com", phone: "+94 771234569", mfaEnabled: false, lastLogin: null, status: "inactive" },
        { userId: "USR-9012", name: "Michael Brown", email: "michael@example.com", phone: null, mfaEnabled: true, lastLogin: new Date(Date.now() - 500000).toISOString(), status: "active" },
        { userId: "USR-4521", name: "Jessica Taylor", email: "jessica@example.com", phone: "+94 771234571", mfaEnabled: true, lastLogin: new Date(Date.now() - 1500000).toISOString(), status: "active" }
      ]
    }
  },
  {
    method: 'PATCH',
    pattern: /^\/admin\/users\/([^/]+)\/lock-status$/,
    response: (config, match) => {
      const parsedBody = JSON.parse(config.data);
      return {
        message: "User lock status updated successfully",
        data: { userId: match[1], locked: parsedBody.locked }
      };
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/devices$/,
    response: {
      message: "Devices retrieved successfully",
      data: {
        devices: [
          { device_id: "DEV-100.", device_name: "MacBook Pro", location: "Colombo, LK", last_active: Date.now() - 50000, ip_address: "192.168.1.45" },
          { device_id: "DEV-1002", device_name: "Samsung Galaxy S24", location: "Kandy, LK", last_active: Date.now() - 150000, ip_address: "10.0.0.112" },
          { device_id: "DEV-1003", device_name: "Windows Desktop", location: "Galle, LK", last_active: Date.now() - 86400000, ip_address: "172.16.0.89" },
          { device_id: "DEV-1004", device_name: "iPad Air", location: "Negombo, LK", last_active: Date.now() - 5000000, ip_address: "192.168.1.67" }
        ],
        pagination: { limit: 20, offset: 0, returned: 4, has_more: false }
      }
    }
  },
  {
    method: 'POST',
    pattern: /^\/admin\/devices\/([^/]+)\/force-logout$/,
    response: (config, match) => {
      return {
        message: "Device logged out successfully",
        data: { device_id: match[1], logged_out: true }
      };
    }
  },
  {
    method: 'PATCH',
    pattern: /^\/admin\/security\/mfa-enforcement$/,
    response: (config) => {
      const parsedBody = JSON.parse(config.data);
      return {
        message: "Two-factor authentication enforcement updated successfully",
        data: { enabled: parsedBody.enabled }
      };
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/auth\/logs$/,
    response: {
      message: "Authentication logs retrieved successfully",
      data: {
        logs: [
          { log_id: "LOG-001", timestamp: Date.now() - 10000, user_name: "Sarah Mitchell", user_id: "USR-8492", status: "success", location: "Colombo", device: "MacBook" },
          { log_id: "LOG-002", timestamp: Date.now() - 20000, user_name: "James Rodriguez", user_id: "USR-7341", status: "failed", location: "Kandy", device: "Chrome On Win" },
          { log_id: "LOG-003", timestamp: Date.now() - 30000, user_name: "Emily Chen", user_id: "USR-6629", status: "success", location: "Galle", device: "iPhone" }
        ],
        pagination: { limit: 20, offset: 0, returned: 3, has_more: false }
      }
    }
  },
  {
    method: 'GET',
    pattern: /^\/admin\/auth\/analytics$/,
    response: {
      message: "Authentication analytics retrieved successfully",
      data: {
        time_range: { from: Date.now() - 86400000, to: Date.now() },
        metrics: {
          successful_logins: 8234,
          failed_logins: 127,
          suspicious_activities: 8
        }
      }
    }
  },
  {
    method: 'GET',
    pattern: /^\/ping$/,
    response: {
      message: "pong",
      data: { server_timestamp: Date.now() }
    }
  }
];
