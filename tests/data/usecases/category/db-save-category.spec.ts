import { DbSaveCategory } from '@/data/usecases'
import {
  AddCategoryRepositorySpy,
  CheckCategoryByNameRepositorySpy,
  mockAddCategoryRepositoryParams,
  mockUpdateCategoryRepositoryParams,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbSaveCategory(updateCategoryRepositorySpy, addCategoryRepositorySpy, checkCategoryByNameRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy,
    addCategoryRepositorySpy,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbSaveCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const category = mockUpdateCategoryRepositoryParams()
    await sut.save(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if UpdateCategoryRepository returns false', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.result = false
    const result = await sut.save(mockUpdateCategoryRepositoryParams())
    expect(result).toBe(false)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if UpdateCategoryRepository returns true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockUpdateCategoryRepositoryParams())
    expect(isValid).toBeTruthy()
  })

  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const category = mockAddCategoryRepositoryParams()
    await sut.save(category)
    expect(addCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if AddCategoryRepository returns false', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.result = false
    const result = await sut.save(mockAddCategoryRepositoryParams())
    expect(result).toBe(false)
  })

  test('Should return true if AddCategoryRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.save(mockAddCategoryRepositoryParams())
    expect(result).toBe(true)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const category = mockUpdateCategoryRepositoryParams()
    await sut.save(category)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(category.name)
  })

  test('Should return false if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.result = true
    const isValid = await sut.save(mockUpdateCategoryRepositoryParams())
    expect(isValid).toBeFalsy()
  })

  test('Should throw if CheckCategoryByNameRepository throws', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
