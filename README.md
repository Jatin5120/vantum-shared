# @Jatin5120/shared

Shared types, constants, and utilities for Vantum frontend and backend.

## Installation

This package is published to GitHub Packages. To install:

### 1. Configure npm to use GitHub Packages

Create or update `.npmrc` in your project root:

```
@Jatin5120:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Authenticate

**For local development:**

```bash
# Create a GitHub Personal Access Token with `read:packages` permission
# Then set it as an environment variable or in .npmrc
export GITHUB_TOKEN=your_token_here
```

**For CI/CD:**

- Use `secrets.GITHUB_TOKEN` (automatically available in GitHub Actions)
- Or set `GITHUB_TOKEN` environment variable

### 3. Install

```bash
pnpm add @Jatin5120/shared
# or
npm install @Jatin5120/shared
```

## Usage

```typescript
import {
  VOICECHAT_EVENTS,
  AudioStartPayload,
  AudioChunkPayload,
  EventMessage,
  ErrorCode,
  toErrorEventType,
  isAudioStartPayload,
} from "@Jatin5120/shared";

// Use event constants
const eventType = VOICECHAT_EVENTS.AUDIO_START;

// Use types
const payload: AudioStartPayload = {
  samplingRate: 16000,
  language: "en-US",
};

// Use utilities
const errorType = toErrorEventType("voicechat.audio.start");
// Returns: 'voicechat.audio.error'

// Use type guards
if (isAudioStartPayload(somePayload)) {
  // TypeScript knows somePayload is AudioStartPayload
}
```

## Development

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Publishing

1. **Update version:**

   ```bash
   pnpm version patch  # 1.0.0 -> 1.0.1
   # or
   pnpm version minor  # 1.0.0 -> 1.1.0
   # or
   pnpm version major  # 1.0.0 -> 2.0.0
   ```

2. **Publish:**

   ```bash
   # Make sure you're authenticated
   export GITHUB_TOKEN=your_token_here

   # Publish
   pnpm publish
   ```

3. **Update consuming projects:**
   ```bash
   # In backend/frontend
   pnpm update @Jatin5120/shared
   ```

## Package Structure

```
src/
├── index.ts              # Main exports
├── events/
│   ├── index.ts         # Event type constants
│   └── payloads.ts      # Payload interfaces
├── messages/
│   └── index.ts         # Message wrapper types
├── errors/
│   └── index.ts         # Error types and codes
└── utils/
    ├── type-guards.ts   # Runtime type checking
    └── event-type.ts    # Event type utilities
```

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## License

ISC
