import {
  AddCategoryRepository,
  UpdateCategoryRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  LoadCategoryNameByIdRepository,
  LoadCategoryByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CategoryPostgresRepository implements
  AddCategoryRepository,
  UpdateCategoryRepository,
  LoadCategoriesRepository,
  LoadCategoryNameByIdRepository,
  LoadCategoryByIdRepository,
  DeleteCategoryRepository {
  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model> {
    const { name, accountId } = category
    const prismaClient = PrismaHelper.getConnection()
    const categoryResult: any = await prismaClient.category.create({
      data: {
        name,
        userId: Number(accountId)
      },
      select: this.selectData()
    })
    return categoryResult
  }

  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model> {
    const { id, name } = category
    const prismaClient = PrismaHelper.getConnection()
    const categoryResult: any = await prismaClient.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      },
      select: this.selectData()
    })
    return categoryResult
  }

  async delete (params: DeleteCategoryRepository.Params): Promise<DeleteCategoryRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const categoryDeleted: any = await prismaClient.category.delete({
      where: {
        id: Number(params.id)
      },
      select: this.selectData()
    })
    return categoryDeleted
  }

  async loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    const where = {
      userId: Number(accountId)
    }
    let categories: any
    if (isNaN(skip) || isNaN(take)) {
      categories = await prismaClient.category.findMany({
        where,
        select: this.selectData()
      })
    } else {
      categories = await prismaClient.category.findMany({
        skip: Number(skip),
        take: Number(take),
        where,
        select: this.selectData()
      })
    }
    const count = await prismaClient.category.count({ where })
    return {
      model: categories,
      count
    }
  }

  async loadById (params: LoadCategoryByIdRepository.Params): Promise<LoadCategoryByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const category: any = await prismaClient.category.findFirst({
      where: {
        id: Number(params.id),
        userId: Number(params.accountId)
      },
      select: this.selectData()
    })
    return category
  }

  async loadNameById (id: number): Promise<LoadCategoryNameByIdRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        name: true
      }
    })
    return category
  }

  private selectData (): any {
    return {
      id: true,
      name: true
    }
  }
}
