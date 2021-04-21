import { UpdateCategory } from '@/domain/usecases'
import {
  CheckCategoryByNameRepository,
  LoadCategoryNameByIdRepository,
  UpdateCategoryRepository
} from '@/data/protocols'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly loadCategoryNameByIdRepository: LoadCategoryNameByIdRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  async update (params: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    await this.loadCategoryNameByIdRepository.loadNameById(params.id)
    await this.checkCategoryByNameRepository.checkByName(params.name)
    return this.updateCategoryRepository.update(params)
  }
}
