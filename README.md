# Vite Plugin Check Environment

A [vite](https://vitejs.dev/) plugin to automatically ensure all environment variables used in your project exist at
build time.


## Features
- **Ngrok Integration**: Quickly expose your Vite development server to the internet using Ngrok tunnels.
- **Dynamic URLs**: Automatically updates Ngrok URLs when your local server restarts or when the Ngrok tunnel is reopened.
- **Custom Configuration**: Fine-tune Ngrok options through a simple configuration file.
- **Simple Sharing**: Just install the plugin, add your auth token, and start sharing your project.

## How to use

1. Create a [Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

2. Install the plugin into your project

```bash
npm i -D vite-plugin-ngrok
```

3. Create / Configure a `vite.config.ts` file in your project root.

```ts
import { loadEnv, defineConfig } from 'vite'
import { ngrok } from 'vite-plugin-ngrok'

export default defineConfig({
  // Note you should not store your ngrok token in your code/repo. Make sure to move this to 
  // a more secure place before sharing your project.
  plugins: [
    ngrok('NGROK_AUTH_TOKEN_IN_HERE'),
  ],
})
```

4. Fire up Vite as usual

```bash
npm run dev
```

## Configuration

The ngrok plugin can be configured in 3 ways. 

1. No configuration. This will default to automatically use the vite port and `authtoken_from_env` will be set to `true`. This will look for `NGROK_AUTHTOKEN` in your environmental variables.

```ts
ngrok()
```

2. If given a string the plugin will assume this is your auth token and configure it automatically with the vite port.

```ts
ngrok('NGROK_AUTH_TOKEN_IN_HERE'),
```

3. Full ngrok config. If given an object you can pass in any options from the ngrok config. This will be merged with the default port from vite so that does not need to be set. Config properties can be found in the [ngrok Javascript SDK Config docs](https://ngrok.github.io/ngrok-javascript/interfaces/Config.html)

```ts
ngrok({
  domain: 'my-domain.ngrok.app',
  compression: true,
  authtoken: 'NGROK_AUTH_TOKEN_IN_HERE',
  ...
})
```
