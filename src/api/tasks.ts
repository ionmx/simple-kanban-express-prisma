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

  if (taskAggregate._max.position !== null) {
    console.log(taskAggregate._max.position)
    position = taskAggregate._max.position + 1
  } else {
    position = 0
  }

  const result = await prisma.task.create({
    data: { description, columnId: columnId, position: position}
  })
  res.json({ data: result })
}

// Move Task
export const moveTask = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params['board_id'])
  const { task, destination, position } = req.body

  const the_task = await prisma.task.findUnique({
    where: { id: task }
  })

  if (the_task) {
    // Update source positions
    await prisma.task.updateMany({
      where: { columnId: the_task.columnId, position: { gt: the_task.position } },
      data: { position: { decrement: 1 } }
    })
    // Update target positions
    await prisma.task.updateMany({
      where: {columnId: destination, position: { gte: position } },
      data: { position: { increment: 1 } }
    })

    const updatedTask = await prisma.task.update({
      where: {
        id: task,
      },
      data: {
        columnId: destination,
        position: position
      }
    })
    res.json({ data: updatedTask })
  }
  res.json({ data: null })
  
}

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params['id'])
  const result = await prisma.task.delete({
    where: { id }
  })
  res.json({ data: result })
}

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params['id'])
  const { description } = req.body
  const result = await prisma.task.update({
    where: { id },
    data: { description }
  })
  res.json({ data: result })
}

