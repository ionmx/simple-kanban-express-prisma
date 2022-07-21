import { prisma } from '../db'
import { Request, Response } from 'express'

// Create Column
export const createColumn = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params['board_id'])
  const { title } = req.body
  let position = 0
  const columnAggregate = await prisma.column.aggregate({
    _max: {
      position: true
    },
    where: {
      boardId: boardId
    }
  })

  if (columnAggregate._max.position) {
    position = columnAggregate._max.position + 1
  }

  const result = await prisma.column.create({
    data: { title, boardId: boardId, position: position }
  })
  res.json({ data: result })
}

// Move Column
export const moveColumn = async (req: Request, res: Response) => {
  const boardId = parseInt(req.params['board_id'])
  const id = parseInt(req.params['id'])
  const { column, position } = req.body

  const col = await prisma.column.findUnique({
    where: { id: column }
  })

  console.log(col)
  console.log(column)
  console.log(position)
  if (col) {
    // Update source positions
    await prisma.column.updateMany({
      where: { boardId: boardId, position: { gt: col.position } },
      data: { position: { decrement: 1 } }
    })
    // Update target positions
    await prisma.column.updateMany({
      where: { boardId: boardId, position: { gte: position } },
      data: { position: { increment: 1 } }
    })

    const updatedCol = await prisma.column.update({
      where: {
        id: column,
      },
      data: {
        position: position
      },
    })
    res.json({ data: updatedCol })
  }
  res.json({ data: null })
  
}


// Column.where("board_id = ? AND position > ?", @column.board_id, @column.position)
//           .update_all("position = position - 1")

//     # Update destination positions
//     Column.where("board_id = ? AND position >= ?", @column.board_id, params["position"])
//           .update_all("position = position + 1")