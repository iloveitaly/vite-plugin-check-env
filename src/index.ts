import type { Plugin, ResolvedConfig } from 'vite'
import { loadEnv } from 'vite'

export interface CheckEnvOptions {
  /**
   * The function name to check for in the code (default: 'requireEnv')
   */
  methodName?: string
}

/**
 * Vite plugin to check that required environment variables are available at build time.
 * Scans your code for calls to a specified function (default: requireEnv) and ensures
 * the environment variables referenced in those calls are defined.
 */
export const checkEnv = (options: CheckEnvOptions = {}) => {
  const methodName = options.methodName || 'requireEnv'
  let env: Record<string, string> = {}

  return {
    name: 'vite-plugin-check-env',
    enforce: 'pre',
    configResolved(config: ResolvedConfig) {
      env = loadEnv(config.mode, process.cwd())
    },
    transform(code: string, id: string) {
      // Only check JS/TS files
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return

      const requireEnvRegex = new RegExp(`${methodName}\\(["'\`](.*?)["'\`]\\)`, 'g')
      let match
      const missingVars = new Set<string>()

      while ((match = requireEnvRegex.exec(code)) !== null) {
        const envKey = match[1]
        if (!env[envKey]) {
          missingVars.add(envKey)
        }
      }

      if (missingVars.size > 0) {
        const missingVarsList = Array.from(missingVars).join(', ')
        throw new Error(
          `Missing environment variables for ${methodName}: ${missingVarsList}`
        )
      }
    },
  } satisfies Plugin
}
