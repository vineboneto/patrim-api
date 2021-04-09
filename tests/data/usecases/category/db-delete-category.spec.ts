import { DbDeleteCategory } from '@/data/usecases'
import { DeleteCategoryRepositorySpy, CheckCategoryByIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteCategory
  deleteCategoryRepositorySpy: DeleteCategoryRepositorySpy
  checkCategoryByIdRepositorySpy: CheckCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdRepositorySpy = new CheckCategoryByIdRepositorySpy()
  const deleteCategoryRepositorySpy = new DeleteCategoryRepositorySpy()
  const sut = new DbDeleteCategory(deleteCategoryRepositorySpy, checkCategoryByIdRepositorySpy)
  return {
    sut,
    deleteCategoryRepositorySpy,
    checkCategoryByIdRepositorySpy
  }
}

describe('DbDeleteCategory', () => {
  test('Should call DeleteCategoryRepository with correct value', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const { id } = mockDeleteCategoryParams()
    await sut.delete({ id })
    expect(deleteCategoryRepositorySpy.id).toBe(id)
  })

  test('Should call CheckCategoryByIdRepository with correct values', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    const { id } = mockDeleteCategoryParams()
    await sut.delete({ id })
    expect(checkCategoryByIdRepositorySpy.id).toBe(id)
  })
})
