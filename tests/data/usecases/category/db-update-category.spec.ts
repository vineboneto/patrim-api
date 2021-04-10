import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategoryRepository } from '@/data/protocols'

import faker from 'faker'

class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  params: UpdateCategoryRepository.Params
  result = true
  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    this.params = category
    return this.result
  }
}

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
    const sut = new DbUpdateCategory(updateCategoryRepositorySpy)
    const category = {
      id: faker.datatype.number(),
      name: faker.name.findName()
    }
    await sut.update(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })
})
