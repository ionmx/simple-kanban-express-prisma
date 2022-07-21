import { prisma } from '../db'
import { Request, Response } from 'express'

// Create Task
export const createTask = async (req: Request, res: Response) => {
  const columnId = parseInt(req.params['column_id'])
  const { description } = req.body
  let position = 0

  const taskAggregate = await prisma.task.aggregate({
    _max: {
      position: true
    },
    where: {
      columnId: columnId
    }
  })

  if (taskAggregate._max.position) {
    position = taskAggregate._max.position + 1
  }

  const result = await prisma.task.create({
    data: { description, columnId: columnId, position: position }
  })
  res.json({ data: result })
}