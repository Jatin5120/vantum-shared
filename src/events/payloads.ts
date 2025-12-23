/**
 * Event Payload Types
 * All payload interfaces for WebSocket events
 */

import type { VOICECHAT_EVENTS } from './index';

// ============================================================================
// Client → Server Event Payloads
// ============================================================================

/**
 * Initialize voice session
 */
export interface AudioStartPayload {
  samplingRate?: number;    // Audio sample rate (default: 16000)
  voiceId?: string;          // TTS voice ID
  language?: string;         // Language code (e.g., 'en-US')
}

/**
 * Stream audio chunk
 */
export interface AudioChunkPayload {
  audio: Uint8Array;         // Raw PCM audio data
  isMuted?: boolean;         // Whether audio is muted (camelCase)
}

/**
 * End voice session
 */
export interface AudioEndPayload {
  // Empty payload - just signals end
}

// ============================================================================
// Server → Client Event Payloads
// ============================================================================

/**
 * AI about to respond
 */
export interface ResponseStartPayload {
  utteranceId: string;       // Unique ID for this response
  timestamp: number;         // Unix timestamp
}

/**
 * TTS audio chunk
 * Note: All chunks for same response share same eventId, but have unique utteranceId per chunk
 */
export interface ResponseChunkPayload {
  audio: Uint8Array;         // Audio data
  utteranceId: string;       // Unique ID per chunk (time-ordered UUIDv7 for ordering)
  sampleRate: number;        // Audio sample rate
}

/**
 * User interrupted AI
 */
export interface ResponseInterruptPayload {
  utteranceId: string;       // ID of interrupted response
  timestamp: number;         // Unix timestamp
}

/**
 * Stop any in-flight / currently playing response audio
 */
export interface ResponseStopPayload {
  utteranceId: string;       // ID of response to stop
  timestamp: number;         // Unix timestamp
}

/**
 * AI response complete
 */
export interface ResponseCompletePayload {
  utteranceId: string;       // Completed response ID
}

/**
 * Connection ACK payload
 */
export interface ConnectionAckPayload {
  success: boolean;
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Map event types to their payload types
 * Useful for type-safe event handling
 */
export interface EventPayloadMap {
  [VOICECHAT_EVENTS.AUDIO_START]: AudioStartPayload;
  [VOICECHAT_EVENTS.AUDIO_CHUNK]: AudioChunkPayload;
  [VOICECHAT_EVENTS.AUDIO_END]: AudioEndPayload;
  [VOICECHAT_EVENTS.RESPONSE_START]: ResponseStartPayload;
  [VOICECHAT_EVENTS.RESPONSE_CHUNK]: ResponseChunkPayload;
  [VOICECHAT_EVENTS.RESPONSE_INTERRUPT]: ResponseInterruptPayload;
  [VOICECHAT_EVENTS.RESPONSE_STOP]: ResponseStopPayload;
  [VOICECHAT_EVENTS.RESPONSE_COMPLETE]: ResponseCompletePayload;
  [VOICECHAT_EVENTS.CONNECTION_ACK]: ConnectionAckPayload;
}

