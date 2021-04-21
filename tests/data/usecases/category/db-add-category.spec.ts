import { DbAddCategory } from '@/data/usecases'
import {
  AddCategoryRepositorySpy,
  CheckCategoryByNameRepositorySpy,
  mockAddCategoryRepositoryParams,
  mockUpdateCategoryRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddCategory
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
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
    const category = mockAddCategoryRepositoryParams()
    await sut.add(category)
    expect(addCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return null if AddCategoryRepository returns null', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.model = null
    const result = await sut.add(mockAddCategoryRepositoryParams())
    expect(result).toBe(null)
  })

  test('Should return on success', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const model = await sut.add(mockAddCategoryRepositoryParams())
    expect(model).toEqual(addCategoryRepositorySpy.model)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const category = mockUpdateCategoryRepositoryParams()
    await sut.add(category)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(category.name)
  })

  test('Should return null if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.result = true
    const model = await sut.add(mockUpdateCategoryRepositoryParams())
    expect(model).toBe(null)
  })

  test('Should throw if CheckCategoryByNameRepository throws', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
