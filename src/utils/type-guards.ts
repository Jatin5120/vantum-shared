/**
 * Type Guards
 * Runtime type checking utilities
 */

import type {
  AudioStartPayload,
  AudioChunkPayload,
  AudioEndPayload,
} from '../events/payloads';

export function isAudioStartPayload(payload: unknown): payload is AudioStartPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }
  const p = payload as Record<string, unknown>;
  // Validate optional fields if present
  if (p.samplingRate !== undefined && (typeof p.samplingRate !== 'number' || p.samplingRate < 0)) {
    return false;
  }
  if (p.voiceId !== undefined && typeof p.voiceId !== 'string') {
    return false;
  }
  if (p.language !== undefined && typeof p.language !== 'string') {
    return false;
  }
  return true;
}

export function isAudioChunkPayload(payload: unknown): payload is AudioChunkPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'audio' in payload &&
    payload.audio instanceof Uint8Array
  );
}

export function isAudioEndPayload(payload: unknown): payload is AudioEndPayload {
  return typeof payload === 'object' && payload !== null;
}

