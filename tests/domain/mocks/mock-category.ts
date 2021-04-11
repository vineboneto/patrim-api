import { CategoryModel } from '@/domain/models'
import { CheckCategoryById, DeleteCategory, LoadCategories, SaveCategory } from '@/domain/usecases'

import faker from 'faker'

export const mockCategoryModel = (): CategoryModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): CategoryModel[] => ([
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel()
])

export const mockDeleteCategoryParams = (): DeleteCategory.Params => ({
  id: faker.datatype.number()
})

export class LoadCategoriesSpy implements LoadCategories {
  categoriesModel = mockCategoriesModel()
  callsCount = 0
  async load (): Promise<LoadCategories.Model> {
    this.callsCount++
    return this.categoriesModel
  }
}

export class DeleteCategorySpy implements DeleteCategory {
  params: DeleteCategory.Params
  model = mockCategoryModel()
  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    this.params = params
    return this.model
  }
}

export class SaveCategorySpy implements SaveCategory {
  params: SaveCategory.Params
  result = true
  async save (category: SaveCategory.Params): Promise<SaveCategory.Result> {
    this.params = category
    return this.result
  }
}

export class CheckCategoryByIdSpy implements CheckCategoryById {
  id: number
  result = true
  async checkById (id: number): Promise<CheckCategoryById.Result> {
    this.id = id
    return this.result
  }
}
