import Fastify from 'fastify'
import { fastifyApp } from './app/index'
export const fastify = Fastify({
  logger: true,
})

fastifyApp(fastify)
