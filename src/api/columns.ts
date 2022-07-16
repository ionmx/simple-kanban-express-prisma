import { prisma } from '../db'
import { Request, Response } from 'express'

// Create Column
export const createColumn = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params['board_id'])
  const { title } = req.body
  const result = await prisma.column.create({
    data: { title, boardId: boardId }
  })
  res.json({ data: result })
}

// Move Column
export const moveColumn = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params['board_id'])
  const id = parseInt(req.params['id'])
  const { position } = req.body
  const column = await prisma.column.findUnique({
    where: { id }
  })

  if (column) {
    // Update source positions
    await prisma.column.updateMany({
      where: { boardId: boardId, position: { gt: column.position } },
      data: { position: { decrement: 1 } }
    })
    // Update target positions
    await prisma.column.updateMany({
      where: { boardId: boardId, position: { gte: position } },
      data: { position: { increment: 1 } }
    })
  }
  res.json({ data: column })
}