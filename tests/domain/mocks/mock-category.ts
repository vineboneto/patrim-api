import { AddCategory, LoadCategories } from '@/domain/usecases'
import faker from 'faker'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.jobType()
})

export const mockAddCategoriesParams = (): AddCategory.Params[] => ([
  mockAddCategoryParams(),
  mockAddCategoryParams(),
  mockAddCategoryParams()
])

export const mockCategoryModel = (): LoadCategories.CategoryModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCategoriesModel = (): LoadCategories.Model => ([
  mockCategoryModel(),
  mockCategoryModel(),
  mockCategoryModel()
])

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
