import { DbDeleteCategory } from '@/data/usecases'
import { DeleteCategoryRepositorySpy, CheckPatrimonyByCategoryIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteCategory
  deleteCategoryRepositorySpy: DeleteCategoryRepositorySpy
  checkPatrimonyByCategoryIdRepositorySpy: CheckPatrimonyByCategoryIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPatrimonyByCategoryIdRepositorySpy = new CheckPatrimonyByCategoryIdRepositorySpy()
  const deleteCategoryRepositorySpy = new DeleteCategoryRepositorySpy()
  const sut = new DbDeleteCategory(deleteCategoryRepositorySpy, checkPatrimonyByCategoryIdRepositorySpy)
  return {
    sut,
    deleteCategoryRepositorySpy,
    checkPatrimonyByCategoryIdRepositorySpy
  }
}

describe('DbDeleteCategory', () => {
  test('Should call CheckPatrimonyByCategoryIdRepository with correct value', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(deleteCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should call CheckPatrimonyByCategoryIdRepository with correct values', async () => {
    const { sut, checkPatrimonyByCategoryIdRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(checkPatrimonyByCategoryIdRepositorySpy.params).toEqual({ categoryId: params.id })
  })

  test('Should return null if CheckPatrimonyByCategoryIdRepository return true', async () => {
    const { sut, checkPatrimonyByCategoryIdRepositorySpy } = makeSut()
    checkPatrimonyByCategoryIdRepositorySpy.result = true
    const result = await sut.delete(mockDeleteCategoryParams())
    expect(result).toBeNull()
  })

  test('Should return category deleted on DeleteCategoryRepository succeeds', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const result = await sut.delete(mockDeleteCategoryParams())
    expect(result).toEqual(deleteCategoryRepositorySpy.model)
  })

  test('Should throws if DeleteCategoryRepository throws', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    jest.spyOn(deleteCategoryRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if CheckPatrimonyByCategoryIdRepository throws', async () => {
    const { sut, checkPatrimonyByCategoryIdRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByCategoryIdRepositorySpy, 'checkByCategoryId').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
