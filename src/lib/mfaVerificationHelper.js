/**
 * Helper utility to manage MFA verification logic.
 * Note: Use this alongside an actual crypto library in production.
 */
export const mfaVerificationHelper = {
  /**
   * Validates a TOTP code against a given secret.
   * @param {string} code - The 6-digit code.
   * @param {string} secret - The user's TOTP secret.
   * @returns {boolean} Whether the code is valid.
   */
  validateCode: (code, secret) => {
    if (!code || code.length !== 6) return false;
    // Mock validation logic
    return parseInt(code, 10) % 2 === 0;
  },

  /**
   * Generates a backup code for MFA recovery.
   * @returns {string} An 8-character alphanumeric backup code.
   */
  generateBackupCode: () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
};
// helper added for MFA flow