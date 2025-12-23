/**
 * Message Wrapper Types
 * Standardized message formats for WebSocket communication
 */

import type { VoicechatEventType } from '../events';

/**
 * Standardized message wrapper for all events
 * All messages follow this structure:
 * - eventType: The event type (e.g., "voicechat.audio.start")
 * - eventId: Unique ID for this event (UUIDv7)
 * - sessionId: Session ID (UUIDv7, same for one session)
 * - payload: Event-specific data
 */
export interface EventMessage<T = unknown> {
  eventType: VoicechatEventType | string;
  eventId: string;          // UUIDv7 for this event
  sessionId: string;       // UUIDv7 (same for one session)
  payload: T;              // Event-specific payload
}

/**
 * Unpacked MessagePack message structure
 * Used when unpacking binary MessagePack messages
 */
export interface UnpackedMessage {
  eventType?: string;
  eventId?: string;
  sessionId?: string;
  payload?: unknown;
}

/**
 * Error message structure
 * Error responses have requestType at top level
 */
export interface ErrorMessage {
  eventType: string;       // Converted using toErrorEventType
  eventId: string;         // Same as original request
  sessionId: string;       // Same as original request
  requestType: string;     // Original request eventType (at top level)
  payload: {
    message: string;       // Error message
  };
}

