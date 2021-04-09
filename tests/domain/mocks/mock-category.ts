import { CategoryModel } from '@/domain/models'
import { AddCategory, DeleteCategory, LoadCategories } from '@/domain/usecases'

import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.jobType()
})

export const mockAddCategoriesParams = (): AddCategory.Params[] => ([
  mockAddCategoryParams(),
  mockAddCategoryParams(),
  mockAddCategoryParams()
])

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

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result = true
  async add (category: AddCategory.Params): Promise<AddCategory.Result> {
    this.params = category
    return this.result
  }
}

export class LoadCategoriesSpy implements LoadCategories {
  categoriesModel = mockCategoriesModel()
  callsCount = 0
  async load (): Promise<LoadCategories.Model> {
    this.callsCount++
    return this.categoriesModel
  }
}
