import type { FastifyInstance } from 'fastify'

export const appStart = async (fastify: FastifyInstance) => {
  try {
    await fastify.listen({ port: 4000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit()
  }
}
