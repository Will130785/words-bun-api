import type { FastifyInstance } from 'fastify'
import { appSetup } from './appSetup'
import { appStart } from './appStart'

export const fastifyApp = async (fastify: FastifyInstance) => {
  appSetup(fastify)
  await appStart(fastify)
}
