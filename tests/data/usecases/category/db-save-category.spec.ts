import { DbSaveCategory } from '@/data/usecases'
import { AddCategoryRepositorySpy, CheckCategoryByNameRepositorySpy, UpdateCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams, mockUpdateCategoryParams } from '@/tests/domain/mocks'

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
    const category = mockUpdateCategoryParams()
    await sut.save(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return false if UpdateCategoryRepository returns false', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.result = false
    const result = await sut.save(mockUpdateCategoryParams())
    expect(result).toBe(false)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateCategoryRepository if id is not undefined', async () => {
    const { sut, updateCategoryRepositorySpy, addCategoryRepositorySpy } = makeSut()
    await sut.save(mockUpdateCategoryParams())
    expect(updateCategoryRepositorySpy.callsCount).toBe(1)
    expect(addCategoryRepositorySpy.callsCount).toBe(0)
  })

  test('Should return true if UpdateCategoryRepository returns true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockUpdateCategoryParams())
    expect(isValid).toBeTruthy()
  })

  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const category = mockAddCategoryParams()
    await sut.save(category)
    expect(addCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should call AddCategoryRepository if id is undefined', async () => {
    const { sut, addCategoryRepositorySpy, updateCategoryRepositorySpy } = makeSut()
    await sut.save(mockAddCategoryParams())
    expect(addCategoryRepositorySpy.callsCount).toBe(1)
    expect(updateCategoryRepositorySpy.callsCount).toBe(0)
  })

  test('Should return false if AddCategoryRepository returns false', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.result = false
    const result = await sut.save(mockAddCategoryParams())
    expect(result).toBe(false)
  })

  test('Should return true if AddCategoryRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.save(mockAddCategoryParams())
    expect(result).toBe(true)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const category = mockUpdateCategoryParams()
    await sut.save(category)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(category.name)
  })

  test('Should return false if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.result = true
    const isValid = await sut.save(mockUpdateCategoryParams())
    expect(isValid).toBeFalsy()
  })
})
