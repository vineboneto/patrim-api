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

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const category = mockSaveCategoryParams()
    await sut.save(category)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(category.name)
  })
})
