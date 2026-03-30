/**
 * Utility for managing user sessions and checking for inactivity timeouts.
 */
export class SessionManager {
  constructor(timeoutMinutes = 15) {
    this.timeoutMs = timeoutMinutes * 60 * 1000;
    this.lastActiveTime = Date.now();
  }

  /**
   * Updates the last active timestamp for the current user.
   */
  ping() {
    this.lastActiveTime = Date.now();
  }

  /**
   * Checks whether the current session has exceeded the timeout period.
   * @returns {boolean} True if the session has expired, false otherwise.
   */
  hasSessionExpired() {
    const now = Date.now();
    return (now - this.lastActiveTime) > this.timeoutMs;
  }
}
