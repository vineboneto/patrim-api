import { DbLoadPatrimoniesByCategoryId } from '@/data/usecases'
import {
  LoadPatrimoniesByCategoryIdRepositorySpy,
  mockLoadPatrimoniesByCategoryIdRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPatrimoniesByCategoryId
  loadPatrimoniesByCategoryIdRepositorySpy: LoadPatrimoniesByCategoryIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByCategoryIdRepositorySpy = new LoadPatrimoniesByCategoryIdRepositorySpy()
  const sut = new DbLoadPatrimoniesByCategoryId(loadPatrimoniesByCategoryIdRepositorySpy)
  return {
    sut,
    loadPatrimoniesByCategoryIdRepositorySpy
  }
}

describe('DbLoadPatrimoniesByCategoryId', () => {
  test('Should call LoadPatrimoniesByCategoryIdRepository with correct value', async () => {
    const { sut, loadPatrimoniesByCategoryIdRepositorySpy } = makeSut()
    const params = mockLoadPatrimoniesByCategoryIdRepositoryParams()
    await sut.loadByCategoryId(params)
    expect(loadPatrimoniesByCategoryIdRepositorySpy.params).toEqual(params)
  })

  test('Should return [] if LoadPatrimoniesByCategoryIdRepository returns empty array', async () => {
    const { sut, loadPatrimoniesByCategoryIdRepositorySpy } = makeSut()
    loadPatrimoniesByCategoryIdRepositorySpy.model = []
    const data = await sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdRepositoryParams())
    expect(data).toEqual([])
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimoniesByCategoryIdRepositorySpy } = makeSut()
    const data = await sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdRepositoryParams())
    expect(data).toEqual(loadPatrimoniesByCategoryIdRepositorySpy.model)
  })

  test('Should throw if LoadPatrimoniesByCategoryIdRepository throws', async () => {
    const { sut, loadPatrimoniesByCategoryIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesByCategoryIdRepositorySpy, 'loadByCategoryId').mockRejectedValueOnce(new Error())
    const promise = sut.loadByCategoryId(mockLoadPatrimoniesByCategoryIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
