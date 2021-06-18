import { DbUpdateCategory } from '@/data/usecases'
import {
  CheckDataByFieldRepositorySpy,
  LoadCategoryNameByIdRepositorySpy,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdateCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  loadCategoryNameByIdRepositorySpy: LoadCategoryNameByIdRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const loadCategoryNameByIdRepositorySpy = new LoadCategoryNameByIdRepositorySpy()
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbUpdateCategory(
    updateCategoryRepositorySpy,
    loadCategoryNameByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  )
  return {
    sut,
    updateCategoryRepositorySpy,
    loadCategoryNameByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  }
}

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    await sut.update(params)
    expect(updateCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdateCategoryRepository returns null', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.model = null
    const data = await sut.update(mockUpdateCategoryParams())
    expect(data).toBe(null)
  })

  test('Should return category on success', async () => {
    const { sut, updateCategoryRepositorySpy, loadCategoryNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    loadCategoryNameByIdRepositorySpy.model.name = 'name'
    params.name = 'name'
    const data = await sut.update(params)
    expect(data).toEqual(updateCategoryRepositorySpy.model)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadCategoryNameByIdRepository with correct values', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    await sut.update(params)
    expect(loadCategoryNameByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadCategoryNameByIdRepository returns different name', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    loadCategoryNameByIdRepositorySpy.model.name = 'differentName'
    const data = await sut.update(mockUpdateCategoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadCategoryNameByIdRepository throw', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCategoryNameByIdRepositorySpy, 'loadNameById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    await sut.update(params)
    expect(checkDataByFieldRepositorySpy.params).toEqual({
      accountId: params.accountId,
      value: params.name
    })
  })

  test('Should return null if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkDataByFieldRepositorySpy, loadCategoryNameByIdRepositorySpy } = makeSut()
    loadCategoryNameByIdRepositorySpy.model.name = 'differentName'
    checkDataByFieldRepositorySpy.result = true
    const params = mockUpdateCategoryParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckCategoryByNameRepository throw', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    loadCategoryNameByIdRepositorySpy.model.name = 'differentName'
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
