import express from 'express'
import cors from 'cors'
import { getAllBoards, createBoard } from './api/boards'

const app = express()

app.use(express.json())
app.use(cors())

// Board routes
app.post(`/api/v1/boards`, createBoard)
app.get(`/api/v1/boards`, getAllBoards)

const server = app.listen(4000, () =>
  console.log(`Server ready at: http://localhost:4000`),
)