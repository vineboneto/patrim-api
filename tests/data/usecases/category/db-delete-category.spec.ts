import { DbDeleteCategory } from '@/data/usecases'
import {
  DeleteCategoryRepositorySpy,
  CheckCategoryByIdRepositorySpy,
  mockDeleteCategoryRepositoryParams
} from '@/tests/data/mocks'

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
    const params = mockDeleteCategoryRepositoryParams()
    await sut.delete(params)
    expect(deleteCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should call CheckCategoryByIdRepository with correct values', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    const params = mockDeleteCategoryRepositoryParams()
    await sut.delete(params)
    expect(checkCategoryByIdRepositorySpy.params).toEqual(params)
  })

  test('Should return null if CheckCategoryByIdRepository return false', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    checkCategoryByIdRepositorySpy.result = false
    const result = await sut.delete(mockDeleteCategoryRepositoryParams())
    expect(result).toBeNull()
  })

  test('Should return category deleted on DeleteCategoryRepository succeeds', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    const result = await sut.delete(mockDeleteCategoryRepositoryParams())
    expect(result).toEqual(deleteCategoryRepositorySpy.model)
  })

  test('Should throws if DeleteCategoryRepository throws', async () => {
    const { sut, deleteCategoryRepositorySpy } = makeSut()
    jest.spyOn(deleteCategoryRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if CheckCategoryByIdRepository throws', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
