import { DbUpdateCategory } from '@/data/usecases'
import { UpdateCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockUpdateCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const sut = new DbUpdateCategory(updateCategoryRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy
  }
}

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const category = mockUpdateCategoryParams()
    await sut.update(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })
})
