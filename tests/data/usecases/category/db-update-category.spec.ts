import { DbUpdateCategory } from '@/data/usecases'
import {
  CheckDataByFieldRepositorySpy,
  LoadDataFieldByIdRepositorySpy,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdateCategoryParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  loadDataFieldByIdRepositorySpy: LoadDataFieldByIdRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const loadDataFieldByIdRepositorySpy = new LoadDataFieldByIdRepositorySpy()
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbUpdateCategory(
    updateCategoryRepositorySpy,
    loadDataFieldByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  )
  return {
    sut,
    updateCategoryRepositorySpy,
    loadDataFieldByIdRepositorySpy,
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
    const { sut, updateCategoryRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    loadDataFieldByIdRepositorySpy.data = 'name'
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

  test('Should call LoadDataFieldByIdRepository with correct values', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdateCategoryParams()
    await sut.update(params)
    expect(loadDataFieldByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadDataFieldByIdRepository returns different name', async () => {
    const { sut, loadDataFieldByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    loadDataFieldByIdRepositorySpy.data = 'differentName'
    const data = await sut.update(mockUpdateCategoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadDataFieldByIdRepository throw', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    jest.spyOn(loadDataFieldByIdRepositorySpy, 'loadFieldById').mockRejectedValueOnce(new Error())
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
    const { sut, checkDataByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data = 'differentName'
    checkDataByFieldRepositorySpy.result = true
    const params = mockUpdateCategoryParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckCategoryByNameRepository throw', async () => {
    const { sut, loadDataFieldByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data = 'differentName'
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
