import express from 'express'
import cors from 'cors'
import { getAllBoards, getBoard, createBoard } from './api/boards'
import { createColumn, moveColumn } from './api/columns'
import { createTask, moveTask } from './api/tasks'

const app = express()

app.use(express.json())
app.use(cors())

// Board routes
app.post(`/api/v1/boards`, createBoard)
app.get(`/api/v1/boards`, getAllBoards)
app.get(`/api/v1/boards/:id`, getBoard)

// Column routes
app.post(`/api/v1/boards/:board_id/columns`, createColumn)
app.post(`/api/v1/boards/:board_id/move-column`, moveColumn)

// Task routes
app.post(`/api/v1/boards/:board_id/columns/:column_id/tasks`, createTask)
app.post(`/api/v1/boards/:board_id/move-task`, moveTask)

const server = app.listen(4000, () =>
  console.log(`Server ready at: http://localhost:4000`),
)