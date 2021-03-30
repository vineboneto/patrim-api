import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/data/protocols'
import { AddCategory } from '@/domain/usecases'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CategoryPostgresRepository implements AddCategoryRepository, CheckCategoryByNameRepository {
  async addCategory (category: AddCategory.Params): Promise<boolean> {
    const { name } = category
    const prismaClient = await PrismaHelper.getConnection()
    const categoryResult = await prismaClient.category.create({
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async checkByName (name: string): Promise<boolean> {
    const prismaClient = await PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    })
    return category !== null
  }
}
