import { DbLoadCategoryById } from '@/data/usecases'
import { LoadCategoryByIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadCategoryByIdParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCategoryById
  loadCategoryByIdRepositorySpy: LoadCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositorySpy = new LoadCategoryByIdRepositorySpy()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositorySpy)
  return {
    sut,
    loadCategoryByIdRepositorySpy
  }
}

describe('DbLoadCategoryById', () => {
  test('Should call LoadCategoryByIdRepository with correct values', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    const params = mockLoadCategoryByIdParams()
    await sut.loadById(params)
    expect(params).toEqual(loadCategoryByIdRepositorySpy.params)
  })

  test('Should return null if LoadCategoryByIdRepository return null', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    loadCategoryByIdRepositorySpy.model = null
    const data = await sut.loadById(mockLoadCategoryByIdParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    const data = await sut.loadById(mockLoadCategoryByIdParams())
    expect(data).toEqual(loadCategoryByIdRepositorySpy.model)
  })

  test('Should throws if LoadCategoryByIdRepository throw', async () => {
    const { sut, loadCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCategoryByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById(mockLoadCategoryByIdParams())
    await expect(promise).rejects.toThrow()
  })
})
