import {
  AddCategoryRepository,
  UpdateCategoryRepository,
  DeleteCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  LoadCategoryNameByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

export class CategoryPostgresRepository implements
  AddCategoryRepository,
  UpdateCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  LoadCategoryNameByIdRepository,
  CheckCategoryByIdRepository,
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
    const { id, name, accountId } = category
    const prismaClient = PrismaHelper.getConnection()
    const categoryResult: any = await prismaClient.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        userId: Number(accountId)
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

  async checkByName (params: CheckCategoryByNameRepository.Params): Promise<boolean> {
    const prismaClient = PrismaHelper.getConnection()
    const category = await prismaClient.category.findFirst({
      where: {
        userId: Number(params.accountId),
        name: params.name
      }
    })
    return category !== null
  }

  async checkById (params: CheckCategoryByIdRepository.Params): Promise<CheckCategoryByIdRepository.Result> {
    const prismaClient = PrismaHelper.getConnection()
    const { id } = params
    const categoryWithOnlyId = await prismaClient.category.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return categoryWithOnlyId !== null
  }

  async loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model> {
    const prismaClient = PrismaHelper.getConnection()
    const { skip, take, accountId } = params
    let categories: any
    if (isNaN(skip) || isNaN(take)) {
      categories = await prismaClient.category.findMany({
        where: {
          userId: Number(accountId)
        },
        select: this.selectData()
      })
    } else {
      categories = await prismaClient.category.findMany({
        skip: Number(skip),
        take: Number(take),
        select: this.selectData()
      })
    }
    return {
      model: categories,
      count: categories.length
    }
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
