import { DbSaveCategory } from '@/data/usecases'
import { SaveCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockSaveCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveCategory
  saveCategoryRepositorySpy: SaveCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveCategoryRepositorySpy = new SaveCategoryRepositorySpy()
  const sut = new DbSaveCategory(saveCategoryRepositorySpy)
  return {
    sut,
    saveCategoryRepositorySpy
  }
}

describe('DbSaveCategory', () => {
  test('Should call SaveCategoryRepository with correct value', async () => {
    const { sut, saveCategoryRepositorySpy } = makeSut()
    const category = mockSaveCategoryParams()
    await sut.save(category)
    expect(saveCategoryRepositorySpy.params).toEqual(category)
  })
})
