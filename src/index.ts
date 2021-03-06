import express from 'express'
import cors from 'cors'
import { getAllBoards, getBoard, createBoard, deleteBoard, updateBoard } from './api/boards'
import { createColumn, moveColumn, deleteColumn, updateColumn } from './api/columns'
import { createTask, moveTask, deleteTask, updateTask } from './api/tasks'

const app = express()

app.use(express.json())
app.use(cors())

// Board routes
app.post(`/api/v1/boards`, createBoard)
app.get(`/api/v1/boards`, getAllBoards)
app.get(`/api/v1/boards/:id`, getBoard)
app.delete(`/api/v1/boards/:id`, deleteBoard)
app.patch(`/api/v1/boards/:id`, updateBoard)

// Column routes
app.post(`/api/v1/boards/:board_id/columns`, createColumn)
app.post(`/api/v1/boards/:board_id/move-column`, moveColumn)
app.delete(`/api/v1/boards/:board_id/columns/:id`, deleteColumn)
app.patch(`/api/v1/boards/:board_id/columns/:id`, updateColumn)

// Task routes
app.post(`/api/v1/boards/:board_id/columns/:column_id/tasks`, createTask)
app.post(`/api/v1/boards/:board_id/move-task`, moveTask)
app.delete(`/api/v1/boards/:board_id/columns/:column_id/tasks/:id`, deleteTask)
app.patch(`/api/v1/boards/:board_id/columns/:column_id/tasks/:id`, updateTask)

// Start server
const server = app.listen(4000, () =>
  console.log(`Server ready at: http://localhost:4000`),
)