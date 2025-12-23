/**
 * Event Type Utilities
 */

/**
 * Convert a request event type to an error event type
 * Example: "voicechat.audio.start" -> "voicechat.audio.error"
 *          "voicechat.response.start" -> "voicechat.response.error"
 *          "chat.message.send" -> "chat.message.error"
 */
export function toErrorEventType(requestType: string): string {
  if (!requestType || typeof requestType !== 'string') {
    throw new Error('Invalid requestType: must be a non-empty string');
  }

  // Split by dots
  const parts = requestType.split('.');
  
  if (parts.length < 2) {
    throw new Error(`Invalid requestType format: "${requestType}". Expected format: "namespace.action" or "namespace.category.action"`);
  }

  // Replace last part with "error"
  parts[parts.length - 1] = 'error';
  
  return parts.join('.');
}

