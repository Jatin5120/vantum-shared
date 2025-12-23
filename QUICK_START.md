# Quick Start Guide

## For Package Maintainers

### First Time Setup

1. **Create GitHub repo** (if not done): `vantum-shared`
2. **Create Personal Access Token** with `write:packages` and `read:packages`
3. **Set environment variable:**
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
4. **Publish:**
   ```bash
   pnpm build
   pnpm publish
   ```

### Making Updates

```bash
# 1. Make changes
# ... edit files in src/ ...

# 2. Build and publish
pnpm build
pnpm version patch  # or minor/major
pnpm publish

# 3. Update consuming projects
cd ../vantum-backend && pnpm update @Jatin5120/shared
cd ../vantum-frontend && pnpm update @Jatin5120/shared
```

## For Package Users (Backend/Frontend)

### Installation

1. **Create `.npmrc` in project root:**
   ```
   @Jatin5120:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

2. **Set GITHUB_TOKEN:**
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

3. **Install:**
   ```bash
   pnpm add @Jatin5120/shared
   ```

### Usage

```typescript
import {
  VOICECHAT_EVENTS,
  AudioStartPayload,
  EventMessage,
  ErrorCode,
  toErrorEventType,
} from '@Jatin5120/shared';

// Use constants
const eventType = VOICECHAT_EVENTS.AUDIO_START;

// Use types
const payload: AudioStartPayload = {
  samplingRate: 16000,
};

// Use utilities
const errorType = toErrorEventType('voicechat.audio.start');
```

### Updating

```bash
pnpm update @Jatin5120/shared
```

