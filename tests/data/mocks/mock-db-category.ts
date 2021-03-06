import {
  AddCategoryRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  UpdateCategoryRepository,
  LoadCategoryByIdRepository
} from '@/data/protocols'
import { mockCategoriesModel, mockCategoryModel } from '@/tests/domain/mocks'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  model = mockCategoryModel()
  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model> {
    this.params = params
    return this.model
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  params: UpdateCategoryRepository.Params
  model = mockCategoryModel()
  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model> {
    this.params = category
    return this.model
  }
}

export class LoadCategoryByIdRepositorySpy implements LoadCategoryByIdRepository {
  params: LoadCategoryByIdRepository.Params
  model = mockCategoryModel()
  async loadById (params: LoadCategoryByIdRepository.Params): Promise<LoadCategoryByIdRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadCategoriesRepositorySpy implements LoadCategoriesRepository {
  params: LoadCategoriesRepository.Params
  models = mockCategoriesModel()

  async loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model> {
    this.params = params
    return {
      count: this.models.length,
      model: this.models
    }
  }
}

export class DeleteCategoryRepositorySpy implements DeleteCategoryRepository {
  model = mockCategoryModel()
  params: DeleteCategoryRepository.Params
  async delete (params: DeleteCategoryRepository.Params): Promise<DeleteCategoryRepository.Model> {
    this.params = params
    return this.model
  }
}
