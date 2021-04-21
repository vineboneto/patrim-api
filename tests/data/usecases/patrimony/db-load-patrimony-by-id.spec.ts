import { DbLoadPatrimonyById } from '@/data/usecases'
import { LoadPatrimonyByIdRepositorySpy, mockLoadPatrimonyByIdRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPatrimonyById
  loadPatrimonyByIdRepositorySpy: LoadPatrimonyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyByIdRepositorySpy = new LoadPatrimonyByIdRepositorySpy()
  const sut = new DbLoadPatrimonyById(loadPatrimonyByIdRepositorySpy)
  return {
    sut,
    loadPatrimonyByIdRepositorySpy
  }
}

describe('DbLoadPatrimonyById', () => {
  test('Should call LoadPatrimonyByIdRepository with correct values', async () => {
    const { sut, loadPatrimonyByIdRepositorySpy } = makeSut()
    const params = mockLoadPatrimonyByIdRepository()
    await sut.loadById(params)
    expect(params).toEqual(loadPatrimonyByIdRepositorySpy.params)
  })
})
