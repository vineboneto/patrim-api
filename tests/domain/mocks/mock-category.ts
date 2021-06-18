import { CategoryModel } from '@/domain/models'
import {
  DeleteCategory,
  LoadCategories,
  AddCategory,
  UpdateCategory,
  LoadCategoryById
} from '@/domain/usecases'

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

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: faker.name.findName(),
  accountId: faker.datatype.number()
})

export const mockUpdateCategoryParams = (): UpdateCategory.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  accountId: faker.datatype.number()
})

export const mockDeleteCategoryParams = (): DeleteCategory.Params => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadCategoriesParams = (): LoadCategories.Params => ({
  accountId: faker.datatype.number(),
  skip: faker.datatype.number(),
  take: faker.datatype.number()
})

export const mockLoadCategoryByIdParams = (): LoadCategoryById.Params => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export class UpdateCategorySpy implements UpdateCategory {
  params: UpdateCategory.Params
  model = mockCategoryModel()
  async update (category: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    this.params = category
    return this.model
  }
}

export class LoadCategoriesSpy implements LoadCategories {
  params: LoadCategories.Params
  categoriesModel = {
    model: mockCategoriesModel(),
    count: mockCategoriesModel().length
  }

  async load (params: LoadCategories.Params): Promise<LoadCategories.Model> {
    this.params = params
    return this.categoriesModel
  }
}

export class LoadCategoryByIdSpy implements LoadCategoryById {
  model = mockCategoryModel()
  params: LoadCategoryById.Params
  async loadById (params: LoadCategoryById.Params): Promise<LoadCategoryById.Model> {
    this.params = params
    return this.model
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

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  model = mockCategoryModel()
  async add (category: AddCategory.Params): Promise<AddCategory.Model> {
    this.params = category
    return this.model
  }
}
