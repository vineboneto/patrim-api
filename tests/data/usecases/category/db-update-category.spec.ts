import { DbUpdateCategory } from '@/data/usecases'
import {
  mockUpdateCategoryRepositoryParams,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'

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
    const category = mockUpdateCategoryRepositoryParams()
    await sut.update(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return null if UpdateCategoryRepository returns null', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.model = null
    const result = await sut.update(mockUpdateCategoryRepositoryParams())
    expect(result).toBe(null)
  })
})
