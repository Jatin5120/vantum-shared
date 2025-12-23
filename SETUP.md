# Setup Guide for @Jatin5120/shared

This guide walks you through setting up and publishing the shared package to GitHub Packages.

## Prerequisites

- GitHub account
- pnpm installed
- Git configured

## Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository: `vantum-shared`
2. Make it **private** (recommended) or public
3. **Don't** initialize with README, .gitignore, or license (we already have these)

## Step 2: Initialize Git Repository

```bash
cd vantum-shared
git init
git add .
git commit -m "Initial commit: shared types package"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vantum-shared.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username or organization name.

## Step 3: Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it: `vantum-shared-publish`
4. Select scopes:
   - ✅ `write:packages` (to publish)
   - ✅ `read:packages` (to read)
   - ✅ `repo` (if private repo)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

## Step 4: Configure Local Authentication

### Option A: Environment Variable (Recommended)

```bash
# Add to your ~/.zshrc or ~/.bashrc
export GITHUB_TOKEN=your_token_here

# Then reload
source ~/.zshrc  # or source ~/.bashrc
```

### Option B: .npmrc (Alternative)

Create `.npmrc` in the `vantum-shared` directory:

```
//npm.pkg.github.com/:_authToken=your_token_here
```

**Note:** Don't commit this file! Add `.npmrc` to `.gitignore` if it contains your token.

## Step 5: Update package.json (if needed)

Make sure the `publishConfig` in `package.json` matches your GitHub username/org:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

The package name `@Jatin5120/shared` should match your GitHub username/org. If your GitHub username is different, update it:

```json
{
  "name": "@YOUR_USERNAME/shared",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

## Step 6: Publish First Version

```bash
cd vantum-shared

# Build the package
pnpm build

# Publish (this will prompt for authentication if not set)
pnpm publish
```

If prompted for authentication:
- Username: Your GitHub username
- Password: Your Personal Access Token (not your GitHub password!)

## Step 7: Verify Publication

1. Go to your GitHub repository
2. Click on "Packages" (right side of the repo page)
3. You should see `@Jatin5120/shared` package listed

## Step 8: Configure Consuming Projects

### In Backend and Frontend

1. **Create `.npmrc` file** in project root:

```
@Jatin5120:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. **Set GITHUB_TOKEN environment variable:**

```bash
export GITHUB_TOKEN=your_token_here
```

3. **Install the package:**

```bash
# In backend/
pnpm add @Jatin5120/shared

# In frontend/
pnpm add @Jatin5120/shared
```

## Step 9: CI/CD Setup

### GitHub Actions Example

```yaml
# .github/workflows/ci.yml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 10.25.0
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@Jatin5120'
      - run: echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" > .npmrc
      - run: pnpm install
      - run: pnpm test
```

**Note:** `secrets.GITHUB_TOKEN` is automatically available in GitHub Actions and has `read:packages` permission.

## Publishing Updates

When you make changes to the shared package:

```bash
cd vantum-shared

# 1. Make your changes
# ... edit files ...

# 2. Build
pnpm build

# 3. Bump version
pnpm version patch  # 1.0.0 -> 1.0.1 (bug fixes)
# or
pnpm version minor  # 1.0.0 -> 1.1.0 (new features)
# or
pnpm version major  # 1.0.0 -> 2.0.0 (breaking changes)

# 4. Publish
pnpm publish

# 5. Update consuming projects
cd ../vantum-backend
pnpm update @Jatin5120/shared

cd ../vantum-frontend
pnpm update @Jatin5120/shared
```

## Troubleshooting

### Error: "You must be logged in to publish packages"

**Solution:** Make sure `GITHUB_TOKEN` is set:
```bash
echo $GITHUB_TOKEN  # Should show your token
```

### Error: "Package name must be scoped"

**Solution:** Package name must start with `@username/` or `@org/`:
```json
{
  "name": "@YOUR_USERNAME/shared"
}
```

### Error: "404 Not Found" when installing

**Solution:** 
1. Check that package is published (GitHub → Packages)
2. Verify `.npmrc` is configured correctly
3. Make sure `GITHUB_TOKEN` has `read:packages` permission

### Error: "403 Forbidden" when publishing

**Solution:**
1. Check that token has `write:packages` permission
2. Verify package name matches your GitHub username/org
3. Make sure you're authenticated: `npm whoami --registry=https://npm.pkg.github.com`

## Next Steps

1. ✅ Package is published
2. ✅ Backend and frontend can install it
3. 🔄 Update backend to use shared types (remove local types)
4. 🔄 Update frontend to use shared types (remove local types)
5. 🔄 Test that everything works

See the main README.md for usage examples.

