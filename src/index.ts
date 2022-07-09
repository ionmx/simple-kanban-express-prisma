import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'


const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.post(`/api/v1/boards`, async (req, res) => {
  const { title, description } = req.body
  const result = await prisma.board.create({
    data: {
      title,
      description
    }
  })
  res.json(result)
})

app.get('/api/v1/boards', async (req, res) => {
  const boards = await prisma.board.findMany()
  res.json({data: boards})
})

const server = app.listen(4000, () =>
  console.log(`Server ready at: http://localhost:4000`),
)