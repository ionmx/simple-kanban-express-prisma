import { prisma } from '../db'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

// export const ColumnData = Prisma.validator<Prisma.ColumnArgs>()({
//   select: { title: true, position: true, boardId: true },
// })

// Create Column
export const createColumn = async (req: Request, res: Response) => {
    const { title } = req.body
    const result = await prisma.board.create({
        data: { title }
    })
    res.json(result)
}