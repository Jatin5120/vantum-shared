/**
 * WebSocket Event Types and Constants
 * Single source of truth for all event type strings
 */

// Event Type Constants
export const VOICECHAT_EVENTS = {
  // Client → Server
  AUDIO_START: 'voicechat.audio.start',
  AUDIO_CHUNK: 'voicechat.audio.chunk',
  AUDIO_END: 'voicechat.audio.end',

  // Server → Client
  RESPONSE_START: 'voicechat.response.start',
  RESPONSE_CHUNK: 'voicechat.response.chunk',
  RESPONSE_INTERRUPT: 'voicechat.response.interrupt',
  RESPONSE_STOP: 'voicechat.response.stop',
  RESPONSE_COMPLETE: 'voicechat.response.complete',
  ERROR: 'voicechat.error',
  CONNECTION_ACK: 'connection.ack',
} as const;

// Event Type Union
export type VoicechatEventType = typeof VOICECHAT_EVENTS[keyof typeof VOICECHAT_EVENTS];

