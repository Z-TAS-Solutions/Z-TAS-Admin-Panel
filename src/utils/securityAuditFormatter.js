/**
 * Formats raw security audit logs into a human-readable format.
 */
export function formatSecurityAuditLog(logEntry) {
  if (!logEntry) return null;

  const { timestamp, action, ipAddress, userAgent, success } = logEntry;
  
  const dateStr = new Date(timestamp).toLocaleString();
  const statusStr = success ? 'SUCCESS' : 'FAILED';
  
  // Parse simple device info from user agent
  let deviceType = 'Unknown Device';
  if (userAgent) {
    if (userAgent.includes('Mobile')) deviceType = 'Mobile';
    else if (userAgent.includes('Windows') || userAgent.includes('Macintosh')) deviceType = 'Desktop';
  }

  return {
    formattedDate: dateStr,
    summary: `${action} [${statusStr}]`,
    details: `Accessed from IP: ${ipAddress || 'unknown'} via ${deviceType}`
  };
}
