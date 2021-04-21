import { DbUpdateCategory } from '@/data/usecases'
import {
  LoadCategoryNameByIdRepositorySpy,
  mockUpdateCategoryRepositoryParams,
  UpdateCategoryRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  loadCategoryNameByIdRepositorySpy: LoadCategoryNameByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const loadCategoryNameByIdRepositorySpy = new LoadCategoryNameByIdRepositorySpy()
  const sut = new DbUpdateCategory(updateCategoryRepositorySpy, loadCategoryNameByIdRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy,
    loadCategoryNameByIdRepositorySpy
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
})
