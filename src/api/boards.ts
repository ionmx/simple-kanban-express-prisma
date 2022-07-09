import { prisma } from '../db'
import { Request, Response } from 'express'

// Get All Boards
export const getAllBoards = async (req: Request, res: Response) => {
  const boards = await prisma.board.findMany()
  res.json({data: boards})
}

// Create Board
export const createBoard = async (req: Request, res: Response) => {
  const { title, description } = req.body
  const result = await prisma.board.create({
    data: {
      title,
      description
    }
  })
  res.json(result)
}