import { Prisma } from '@prisma/client';

const columnData = Prisma.validator<Prisma.ColumnArgs>()({
  select: { title: true, position: true, boardId: true }
});

export type ColumnData = Prisma.ColumnGetPayload<typeof columnData>;
