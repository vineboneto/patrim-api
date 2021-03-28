import { DbAddCategory } from '@/data/usecases/db-add-category'
import { AddCategoryRepository } from '@/data/protocols/add-category-repository'

class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result: boolean
  async addCategory (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = category
    return this.result
  }
}

describe('DbAddCategory', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
    const sut = new DbAddCategory(addCategoryRepositorySpy)
    await sut.add({ name: 'any_name' })
    expect(addCategoryRepositorySpy.params).toEqual({ name: 'any_name' })
  })

  // test('DbAddCategory should return true on success', async () => {
  //   const sut = new DbAddCategory()
  //   const isValid = await sut.add({ name: 'any_name' })
  //   expect(isValid).toBeTruthy()
  // })
})
