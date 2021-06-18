import { DbDeleteCategory } from '@/data/usecases'
import { DeleteCategoryRepositorySpy, CheckDataByFieldRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteCategory
  deleteCategoryRepositorySpy: DeleteCategoryRepositorySpy
  checkPatrimonyByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPatrimonyByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const deleteCategoryRepositorySpy = new DeleteCategoryRepositorySpy()
  const sut = new DbDeleteCategory(deleteCategoryRepositorySpy, checkPatrimonyByFieldRepositorySpy)
  return {
    sut,
    deleteCategoryRepositorySpy,
    checkPatrimonyByFieldRepositorySpy
  }
}

describe('DbDeleteCategory', () => {
  test('Should call DeleteCategoryRepository with correct value', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(deleteCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should call CheckDataByFieldRepositorySpy with correct values', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    const params = mockDeleteCategoryParams()
    await sut.delete(params)
    expect(checkPatrimonyByFieldRepositorySpy.params).toEqual({
      value: params.id,
      accountId: params.accountId
    })
  })

  test('Should return null if CheckDataByFieldRepositorySpy return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    checkPatrimonyByFieldRepositorySpy.result = true
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

  test('Should throws if CheckDataByFieldRepositorySpy throws', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
