import { DbAddCategory } from '@/data/usecases/'
import { AddCategoryRepositorySpy, CheckCategoryByNameRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy, checkCategoryByNameRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy,
    checkCategoryByNameRepositorySpy
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

  test('Should call CheckCategoryByNameRepositories with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const sector = mockAddCategoryParams()
    await sut.add(sector)
    expect(checkCategoryByNameRepositorySpy.name).toBe(sector.name)
  })

  test('Should return false if CheckCategoryByNameRepository return true', () => {

  })
  // test('DbAddCategory should return true on success', async () => {
  //   const sut = new DbAddCategory()
  //   const isValid = await sut.add({ name: 'any_name' })
  //   expect(isValid).toBeTruthy()
  // })
})
