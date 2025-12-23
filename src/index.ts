/**
 * @Jatin5120/vantum-shared
 * 
 * Shared types, constants, and utilities for Vantum frontend and backend
 * 
 * This package provides:
 * - WebSocket event types and constants
 * - Event payload interfaces
 * - Message wrapper types
 * - Error types and codes
 * - Type guards and utilities
 */

// Events
export * from './events';
export * from './events/payloads';

// Messages
export * from './messages';

// Errors
export * from './errors';

// Utils
export * from './utils/type-guards';
export * from './utils/event-type';

// Re-export commonly used types for convenience
export type {
  AudioStartPayload,
  AudioChunkPayload,
  AudioEndPayload,
  ResponseStartPayload,
  ResponseChunkPayload,
  ResponseInterruptPayload,
  ResponseStopPayload,
  ResponseCompletePayload,
  ConnectionAckPayload,
} from './events/payloads';

export type {
  EventMessage,
  UnpackedMessage,
  ErrorMessage,
} from './messages';

export type {
  ErrorPayload,
} from './errors';

