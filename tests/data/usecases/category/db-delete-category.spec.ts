import { DbDeleteCategory } from '@/data/usecases'
import { DeleteCategoryRepositorySpy, CheckPatrimonyByFieldByIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteCategory
  deleteCategoryRepositorySpy: DeleteCategoryRepositorySpy
  checkPatrimonyByFieldByIdRepositorySpy: CheckPatrimonyByFieldByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPatrimonyByFieldByIdRepositorySpy = new CheckPatrimonyByFieldByIdRepositorySpy()
  const deleteCategoryRepositorySpy = new DeleteCategoryRepositorySpy()
  const sut = new DbDeleteCategory(deleteCategoryRepositorySpy, checkPatrimonyByFieldByIdRepositorySpy)
  return {
    sut,
    deleteCategoryRepositorySpy,
    checkPatrimonyByFieldByIdRepositorySpy
  }
}

describe('DbDeleteCategory', () => {
  test('Should call DeleteCategoryRepository with correct value', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(deleteCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should call CheckPatrimonyByFieldByIdRepositorySpy with correct values', async () => {
    const { sut, checkPatrimonyByFieldByIdRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(checkPatrimonyByFieldByIdRepositorySpy.params).toEqual({
      value: params.id,
      accountId: params.accountId
    })
  })

  test('Should return null if CheckPatrimonyByFieldByIdRepositorySpy return true', async () => {
    const { sut, checkPatrimonyByFieldByIdRepositorySpy } = makeSut()
    checkPatrimonyByFieldByIdRepositorySpy.result = true
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

  test('Should throws if CheckPatrimonyByFieldByIdRepositorySpy throws', async () => {
    const { sut, checkPatrimonyByFieldByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByFieldByIdRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
