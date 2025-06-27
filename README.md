# Vite Plugin Check Environment

A [Vite](https://vitejs.dev/) plugin to automatically ensure all environment variables used in your project exist at build time.

It does this in a very naive way by scanning your code for calls to a specified function (default: `requireEnv`) and checking that all environment variables referenced in those calls are defined in your environment.

It's simple, and it works. [Here's an example](https://github.com/iloveitaly/python-starter-template) of it being used in a project.

## Features

- **Build-time validation**: Catches missing environment variables before deployment
- **No maintenance overhead**: No need to maintain a separate list of required environment variables
- **Configurable function name**: Customize the function name that triggers environment variable checks
- **TypeScript support**: Works with JavaScript, TypeScript, JSX, and TSX files

## How it works

The plugin scans your code for calls to a specified function (default: `requireEnv`) and ensures that all environment variables referenced in those calls are defined in your environment.

## Installation

```bash
npm i -D vite-plugin-check-env
```

## Basic Usage

1. Create / Configure a `vite.config.ts` file in your project root:

```ts
import { defineConfig } from 'vite'
import { checkEnv } from 'vite-plugin-check-env'

export default defineConfig({
  plugins: [
    checkEnv(),
  ],
})
```

2. In your code, use the `requireEnv` function to access environment variables:

```ts
// This will be checked at build time
const apiUrl = requireEnv('API_URL')
const secretKey = requireEnv('SECRET_KEY')
```

3. Make sure your environment variables are defined in your `.env` file or environment:

```env
API_URL=https://api.example.com
SECRET_KEY=your-secret-key
```

4. Run your build as usual:

```bash
npm run dev
# or
npm run build
```

If any environment variables are missing, the build will fail with a clear error message.

## Configuration

### Custom Method Name

You can configure the function name that the plugin looks for:

```ts
import { defineConfig } from 'vite'
import { checkEnv } from 'vite-plugin-check-env'

export default defineConfig({
  plugins: [
    checkEnv({
      methodName: 'getEnv' // Look for getEnv() calls instead of requireEnv()
    }),
  ],
})
```

Then in your code:

```ts
const apiUrl = getEnv('API_URL')
```

## Example

Here's a complete example of how to use the plugin:

**vite.config.ts**
```ts
import { defineConfig } from 'vite'
import { checkEnv } from 'vite-plugin-check-env'

export default defineConfig({
  plugins: [
    checkEnv(),
  ],
})
```

**src/config.ts**
```ts
// These environment variables will be validated at build time
export const config = {
  apiUrl: requireEnv('VITE_API_URL'),
  appName: requireEnv('VITE_APP_NAME'),
  version: requireEnv('VITE_VERSION'),
}
```

**.env**
```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
VITE_VERSION=1.0.0
```

If you forget to define any of these variables, you'll get a build error like:

```
Missing environment variables for requireEnv: VITE_VERSION
```

## API

### `checkEnv(options?)`

#### Options

- `methodName` (string, optional): The function name to look for in your code. Default: `'requireEnv'`

## License

MIT
