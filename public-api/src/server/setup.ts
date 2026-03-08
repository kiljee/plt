import type { ServerSetupFn } from 'wasp/server'

const DEFAULT_CORS_ORIGIN = 'http://localhost:3000'

const getAllowedOrigins = (): string[] => {
  const raw = process.env.CORS_ORIGINS ?? process.env.CORS_ORIGIN ?? ''
  const origins = raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)

  return origins.length > 0 ? [...new Set(origins)] : [DEFAULT_CORS_ORIGIN]
}

export const serverSetup: ServerSetupFn = async ({ app }) => {
  const allowedOrigins = getAllowedOrigins()

  app.use((req, res, next) => {
    const origin = req.headers.origin

    if (origin && allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Vary', 'Origin')
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )
    }

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204)
    }

    next()
  })
}