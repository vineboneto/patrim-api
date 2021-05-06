import { CategoryModel } from '@/domain/models'
import {
  CheckCategoryById,
  DeleteCategory,
  LoadCategories,
  AddCategory,
  UpdateCategory
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

export const mockCheckCategoryByIdParams = (): CheckCategoryById.Params => ({
  id: faker.datatype.number()
})

export const mockDeleteCategoryParams = (): DeleteCategory.Params => ({
  id: faker.datatype.number()
})

export const mockLoadCategoriesParams = (): LoadCategories.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number()
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
  categoriesModel = mockCategoriesModel()
  params: LoadCategories.Params
  async load (params: LoadCategories.Params): Promise<LoadCategories.Model> {
    this.params = params
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

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  model = mockCategoryModel()
  async add (category: AddCategory.Params): Promise<AddCategory.Model> {
    this.params = category
    return this.model
  }
}

export class CheckCategoryByIdSpy implements CheckCategoryById {
  params: CheckCategoryById.Params
  result = true
  async checkById (params: CheckCategoryById.Params): Promise<CheckCategoryById.Result> {
    this.params = params
    return this.result
  }
}
