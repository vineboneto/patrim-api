import { DbLoadPatrimoniesBySectorId } from '@/data/usecases'
import { LoadPatrimoniesBySectorIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesBySectorIdParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadPatrimoniesBySectorId
  loadPatrimoniesBySectorIdRepositorySpy: LoadPatrimoniesBySectorIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesBySectorIdRepositorySpy = new LoadPatrimoniesBySectorIdRepositorySpy()
  const sut = new DbLoadPatrimoniesBySectorId(loadPatrimoniesBySectorIdRepositorySpy)
  return {
    sut,
    loadPatrimoniesBySectorIdRepositorySpy
  }
}

describe('DbLoadPatrimoniesBySectorId', () => {
  test('Should call LoadPatrimoniesBySectorIdRepository with correct value', async () => {
    const { sut, loadPatrimoniesBySectorIdRepositorySpy } = makeSut()
    const params = mockLoadPatrimoniesBySectorIdParams()
    await sut.loadBySectorId(params)
    expect(loadPatrimoniesBySectorIdRepositorySpy.params).toEqual(params)
  })

  test('Should return [] if LoadPatrimoniesBySectorIdRepository returns empty array', async () => {
    const { sut, loadPatrimoniesBySectorIdRepositorySpy } = makeSut()
    loadPatrimoniesBySectorIdRepositorySpy.result.model = []
    const data = await sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    expect(data.model).toEqual([])
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimoniesBySectorIdRepositorySpy } = makeSut()
    const data = await sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    expect(data.model).toEqual(loadPatrimoniesBySectorIdRepositorySpy.result.model)
  })

  test('Should throw if LoadPatrimoniesBySectorIdRepository throws', async () => {
    const { sut, loadPatrimoniesBySectorIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesBySectorIdRepositorySpy, 'loadBySectorId').mockRejectedValueOnce(new Error())
    const promise = sut.loadBySectorId(mockLoadPatrimoniesBySectorIdParams())
    await expect(promise).rejects.toThrow()
  })
})
