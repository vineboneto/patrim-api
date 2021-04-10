import { DbSaveCategory } from '@/data/usecases'
import { CheckCategoryByNameRepositorySpy, SaveCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockSaveCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveCategory
  saveCategoryRepositorySpy: SaveCategoryRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const saveCategoryRepositorySpy = new SaveCategoryRepositorySpy()
  const sut = new DbSaveCategory(saveCategoryRepositorySpy, checkCategoryByNameRepositorySpy)
  return {
    sut,
    saveCategoryRepositorySpy,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbSaveCategory', () => {
  test('Should call SaveCategoryRepository with correct value', async () => {
    const { sut, saveCategoryRepositorySpy } = makeSut()
    const category = mockSaveCategoryParams()
    await sut.save(category)
    expect(saveCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if SaveCategoryRepository returns false', async () => {
    const { sut, saveCategoryRepositorySpy } = makeSut()
    saveCategoryRepositorySpy.result = false
    const result = await sut.save(mockSaveCategoryParams())
    expect(result).toBe(false)
  })

  test('Should throw if SaveCategoryRepository throws', async () => {
    const { sut, saveCategoryRepositorySpy } = makeSut()
    jest.spyOn(saveCategoryRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveCategoryParams())
    await expect(promise).rejects.toThrow()
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
