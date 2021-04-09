import { DbDeleteCategory } from '@/data/usecases'
import { DeleteCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteCategory
  deleteCategoryRepositorySpy: DeleteCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteCategoryRepositorySpy = new DeleteCategoryRepositorySpy()
  const sut = new DbDeleteCategory(deleteCategoryRepositorySpy)
  return {
    sut,
    deleteCategoryRepositorySpy
  }
}

describe('DbDeleteCategory', () => {
  test('Should call DeleteCategoryRepository with correct value', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const { id } = mockDeleteCategoryParams()
    await sut.delete({ id })
    expect(deleteCategoryRepositorySpy.id).toBe(id)
  })
})
