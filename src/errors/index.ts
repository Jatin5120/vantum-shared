/**
 * Error Types and Codes
 */

// Error Code Constants
export const ErrorCode = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  INVALID_PAYLOAD: 'INVALID_PAYLOAD',
  SESSION_ERROR: 'SESSION_ERROR',
  AUDIO_ERROR: 'AUDIO_ERROR',
  STT_ERROR: 'STT_ERROR',
  LLM_ERROR: 'LLM_ERROR',
  TTS_ERROR: 'TTS_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

/**
 * Error payload structure
 * Note: In error messages, requestType is at top level, not in payload
 */
export interface ErrorPayload {
  requestType: string;      // Original request event type (e.g., "voicechat.audio.start")
  error: {
    message: string;         // Error message
    code: ErrorCode | string; // Error code
    timestamp: number;       // Unix timestamp
  };
  requestEventId?: string;   // Optional request event_id for correlation
}

