import { neon } from '@neondatabase/serverless'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { IAddWordPayload } from '../types'

const sql = neon(process.env.DATABASE_URL ?? '')

export const getWords = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const words = await sql`SELECT * FROM words`
    if (!words || !words.length) {
      return reply
        .status(404)
        .send({ success: false, message: 'No words found' })
    }
    return reply.status(200).send({ success: true, words: words[0] })
  } catch (err) {
    console.log(`Error getting words ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error getting words ${err}` })
  }
}

export const getWord = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as unknown as { id: string }
  try {
    const word = await sql`SELECT * FROM words WHERE id = ${id}`
    if (!word || !word.length) {
      return reply
        .status(404)
        .send({ success: false, message: `No word found for id ${id}` })
    }
    return reply.status(200).send({ success: true, word: word[0] })
  } catch (err) {
    console.log(`Error getting word id ${id} - ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error getting word id ${id} - ${err}` })
  }
}

export const addWord = async (request: FastifyRequest, reply: FastifyReply) => {
  const word = request.body as unknown as IAddWordPayload
  console.log(word, 'WORD')
  try {
    await sql`INSERT INTO words (english, italian) VALUES (${word.english}, ${word.italian})`
    return reply.status(201).send({ success: true })
  } catch (err) {
    console.log(`Error adding word ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error adding word ${err}` })
  }
}

export const editWord = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string }
  const word = request.body as unknown as IAddWordPayload

  try {
    await sql`UPDATE words SET english = ${word.english} italian = ${word.italian} WHERE id = ${id}`
    return reply.status(201).send({ success: true })
  } catch (err) {
    console.log(`Error updating id ${id} - ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error updating id ${id} - ${err}` })
  }
}

export const deleteWord = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string }
  try {
    await sql`DELETE FROM words WHERE id = ${id}`
    return reply.status(200).send({ success: true })
  } catch (err) {
    console.log(`Error deleting id ${id} - ${err}`)
    return reply
      .status(500)
      .send({ success: false, message: `Error deleting id ${id} - ${err}` })
  }
}
