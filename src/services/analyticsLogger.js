export const analyticsLogger = {
  /**
   * Logs an action in the application to the anaytics service.
   * @param {string} eventName - Name of the event.
   * @param {object} properties - Additional data related to the event.
   */
  logEvent: (eventName, properties = {}) => {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      data: properties,
    };
    
    // In production, send this via fetch or tracking SDK
    console.debug('[Analytics Logger] Event captured:', payload);
  },

  /**
   * Logs an authentication failure specifically for security tracking.
   * @param {string} username - The attempted username.
   * @param {string} reason - Why the authentication failed.
   */
  logAuthFailure: (username, reason) => {
    analyticsLogger.logEvent('auth_failure', { username, reason, riskLevel: 'high' });
  }
};

// analytics logging added
