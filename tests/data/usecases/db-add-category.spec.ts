import { DbAddCategory } from '@/data/usecases/'
import { AddCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const category = mockAddCategoryParams()
    await sut.add(category)
    expect(addCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if AddCategoryRepository return false', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.result = false
    const isValid = await sut.add(mockAddCategoryParams)
    expect(isValid).toBeFalsy()
  })

  test('Should call CheckCategoryByNameRepositories with correct values', () => {

  })

  test('Should return false if CheckCategoryByNameRepository return true', () => {

  })
  // test('DbAddCategory should return true on success', async () => {
  //   const sut = new DbAddCategory()
  //   const isValid = await sut.add({ name: 'any_name' })
  //   expect(isValid).toBeTruthy()
  // })
})
