import { UpdateCategory } from '@/domain/usecases'
import { LoadCategoryNameByIdRepository, UpdateCategoryRepository } from '@/data/protocols'

export class DbUpdateCategory implements UpdateCategory {
  constructor (
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly loadCategoryNameByIdRepository: LoadCategoryNameByIdRepository
  ) {}

  async update (params: UpdateCategory.Params): Promise<UpdateCategory.Model> {
    await this.loadCategoryNameByIdRepository.loadNameById(params.id)
    return this.updateCategoryRepository.update(params)
  }
}
