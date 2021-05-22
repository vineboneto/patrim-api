import { DbLoadSectorById } from '@/data/usecases'
import { LoadSectorByIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadSectorByIdParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadSectorById
  loadSectorByIdRepositorySpy: LoadSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSectorByIdRepositorySpy = new LoadSectorByIdRepositorySpy()
  const sut = new DbLoadSectorById(loadSectorByIdRepositorySpy)
  return {
    sut,
    loadSectorByIdRepositorySpy
  }
}

describe('DbLoadSectorById', () => {
  test('Should call LoadSectorByIdRepository with correct values', async () => {
    const { sut, loadSectorByIdRepositorySpy } = makeSut()
    const params = mockLoadSectorByIdParams()
    await sut.loadById(params)
    expect(params).toEqual(loadSectorByIdRepositorySpy.params)
  })

  test('Should return null if LoadSectorByIdRepository return null', async () => {
    const { sut, loadSectorByIdRepositorySpy } = makeSut()
    loadSectorByIdRepositorySpy.model = null
    const data = await sut.loadById(mockLoadSectorByIdParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadSectorByIdRepositorySpy } = makeSut()
    const data = await sut.loadById(mockLoadSectorByIdParams())
    expect(data).toEqual(loadSectorByIdRepositorySpy.model)
  })

  test('Should throws if LoadSectorByIdRepository throw', async () => {
    const { sut, loadSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSectorByIdRepositorySpy, 'loadById').mockRejectedValueOnce(new Error())
    const promise = sut.loadById(mockLoadSectorByIdParams())
    await expect(promise).rejects.toThrow()
  })
})
