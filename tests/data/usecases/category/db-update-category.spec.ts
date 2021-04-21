import { DbUpdateCategory } from '@/data/usecases'
import {
  CheckCategoryByNameRepositorySpy,
  LoadCategoryNameByIdRepositorySpy,
  mockUpdateCategoryRepositoryParams,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  loadCategoryNameByIdRepositorySpy: LoadCategoryNameByIdRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const loadCategoryNameByIdRepositorySpy = new LoadCategoryNameByIdRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const sut = new DbUpdateCategory(
    updateCategoryRepositorySpy,
    loadCategoryNameByIdRepositorySpy,
    checkCategoryByNameRepositorySpy
  )
  return {
    sut,
    updateCategoryRepositorySpy,
    loadCategoryNameByIdRepositorySpy,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct value', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const category = mockUpdateCategoryRepositoryParams()
    await sut.update(category)
    expect(updateCategoryRepositorySpy.params).toEqual(category)
  })

  test('Should return null if UpdateCategoryRepository returns null', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    updateCategoryRepositorySpy.model = null
    const result = await sut.update(mockUpdateCategoryRepositoryParams())
    expect(result).toBe(null)
  })

  test('Should return category on success', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const model = await sut.update(mockUpdateCategoryRepositoryParams())
    expect(model).toEqual(updateCategoryRepositorySpy.model)
  })

  test('Should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadCategoryNameByIdRepository with correct values', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateCategoryRepositoryParams()
    await sut.update(params)
    expect(loadCategoryNameByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should throws if LoadCategoryNameByIdRepository throw', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCategoryNameByIdRepositorySpy, 'loadNameById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckCategoryByNameRepository with correct value', async () => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    const params = mockUpdateCategoryRepositoryParams()
    await sut.update(params)
    expect(checkCategoryByNameRepositorySpy.name).toEqual(params.name)
  })

  test('Should return null if CheckCategoryByNameRepository return true', async () => {
    const { sut, checkCategoryByNameRepositorySpy, loadCategoryNameByIdRepositorySpy } = makeSut()
    loadCategoryNameByIdRepositorySpy.model.name = 'differentName'
    checkCategoryByNameRepositorySpy.result = true
    const params = mockUpdateCategoryRepositoryParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckCategoryByNameRepository throw', async () => {
    const { sut, loadCategoryNameByIdRepositorySpy, checkCategoryByNameRepositorySpy } = makeSut()
    loadCategoryNameByIdRepositorySpy.model.name = 'differentName'
    jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateCategoryRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
