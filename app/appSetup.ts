import type { FastifyInstance } from 'fastify'
import { router } from '../routes'

export const appSetup = (fastify: FastifyInstance) => {
  router(fastify)
}
