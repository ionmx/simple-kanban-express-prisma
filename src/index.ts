import express from 'express'
import cors from 'cors'
import { getAllBoards, getBoard, createBoard } from './api/boards'
import { createColumn } from './api/columns'

const app = express()

app.use(express.json())
app.use(cors())

// Board routes
app.post(`/api/v1/boards`, createBoard)
app.get(`/api/v1/boards`, getAllBoards)
app.get(`/api/v1/boards/:id`, getBoard)

// Column routes
app.post(`/api/v1/boards/:id/columns`, createColumn)

const server = app.listen(4000, () =>
  console.log(`Server ready at: http://localhost:4000`),
)