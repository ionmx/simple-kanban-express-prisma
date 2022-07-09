import { prisma } from '../db'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

// Create Column
export const createColumn = async (req: Request, res: Response) => {
  const id = parseInt(req.params['id'])
  const { title } = req.body
  const result = await prisma.column.create({
    data: { title, boardId: id }
  })
  res.json({ data: result })
}