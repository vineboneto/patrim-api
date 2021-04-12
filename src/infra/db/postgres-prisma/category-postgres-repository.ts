import {
  AddCategoryRepository,
  UpdateCategoryRepository,
  DeleteCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository
} from '@/data/protocols'
import { PrismaHelper } from '@/infra/db/postgres-prisma'

import { PrismaClient } from '@prisma/client'

export class CategoryPostgresRepository implements
  AddCategoryRepository,
  UpdateCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  DeleteCategoryRepository {
  private readonly prismaClient: PrismaClient

  constructor () {
    this.prismaClient = PrismaHelper.getConnection()
  }

  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    const { name } = category
    const categoryResult = await this.prismaClient.category.create({
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    const { id, name } = category
    const categoryResult = await this.prismaClient.category.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      }
    })
    return categoryResult !== null
  }

  async delete (id: number): Promise<DeleteCategoryRepository.Model> {
    const categoryDeleted = await this.prismaClient.category.delete({
      where: {
        id: Number(id)
      }
    })
    return categoryDeleted
  }

  async checkByName (name: string): Promise<boolean> {
    const category = await this.prismaClient.category.findFirst({
      where: {
        name
      }
    })
    return category !== null
  }

  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    const categories = await this.prismaClient.category.findMany()
    return categories
  }

  async checkById (id: number): Promise<CheckCategoryByIdRepository.Result> {
    const categoryWithOnlyId = await this.prismaClient.category.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true
      }
    })
    return categoryWithOnlyId !== null
  }
}
