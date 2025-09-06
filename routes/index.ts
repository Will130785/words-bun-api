import type { FastifyInstance } from 'fastify'
import {
  getWords,
  getWord,
  addWord,
  editWord,
  deleteWord,
} from '../controllers'

export const router = (fastify: FastifyInstance) => {
  fastify.get('/get-words', getWords)
  fastify.get('/get-word/:id', getWord)
  fastify.post('/add-word', addWord)
  fastify.put('/edit-word/:id', editWord)
  fastify.delete('/delete-word/:id', deleteWord)
}
