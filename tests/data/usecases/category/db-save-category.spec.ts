import { DbSaveCategory } from '@/data/usecases'
import { CheckCategoryByNameRepositorySpy, UpdateCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockSaveCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const sut = new DbSaveCategory(updateCategoryRepositorySpy, checkCategoryByNameRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbSaveCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const category = mockSaveCategoryParams()
    await sut.save(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if UpdateCategoryRepository returns false', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.result = false
    const result = await sut.save(mockSaveCategoryParams())
    expect(result).toBe(false)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateCategoryRepository if id is not undefined', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    await sut.save(mockSaveCategoryParams())
    expect(updateCategoryRepositorySpy.callsCount).toBe(1)
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const category = mockSaveCategoryParams()
    await sut.save(category)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(category.name)
  })

  test('Should return false if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.result = true
    const isValid = await sut.save(mockSaveCategoryParams())
    expect(isValid).toBeFalsy()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockSaveCategoryParams())
    expect(isValid).toBeTruthy()
  })
})
