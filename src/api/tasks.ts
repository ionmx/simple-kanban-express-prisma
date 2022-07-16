import { prisma } from '../db'
import { Request, Response } from 'express'

// Create Task
export const createTask = async (req: Request, res: Response) => {
  const columnId = parseInt(req.params['column_id'])
  const { description } = req.body
  const result = await prisma.task.create({
    data: { description, columnId: columnId }
  })
  res.json({ data: result })
}