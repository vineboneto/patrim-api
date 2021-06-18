import { DbAddCategory } from '@/data/usecases'
import { AddCategoryRepositorySpy, CheckDataByFieldRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddCategory
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy, checkDataByFieldRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy,
    checkDataByFieldRepositorySpy
  }
}

describe('DbAddCategory', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const category = mockAddCategoryParams()
    await sut.add(category)
    expect(addCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return null if AddCategoryRepository returns null', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    addCategoryRepositorySpy.model = null
    const result = await sut.add(mockAddCategoryParams())
    expect(result).toBe(null)
  })

  test('Should return on success', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const model = await sut.add(mockAddCategoryParams())
    expect(model).toEqual(addCategoryRepositorySpy.model)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    const params = mockAddCategoryParams()
    await sut.add(params)
    expect(checkDataByFieldRepositorySpy.params).toEqual({
      accountId: params.accountId,
      value: params.name
    })
  })

  test('Should return null if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    const model = await sut.add(mockAddCategoryParams())
    expect(model).toBe(null)
  })

  test('Should throw if CheckCategoryByNameRepository throws', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
