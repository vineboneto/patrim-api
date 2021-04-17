import { DbCheckPlaceById } from '@/data/usecases'
import { CheckPlaceByIdRepositorySpy, mockCheckPlaceByIdRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbCheckPlaceById
  checkPlaceByIdRepositorySpy: CheckPlaceByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByIdRepositorySpy = new CheckPlaceByIdRepositorySpy()
  const sut = new DbCheckPlaceById(checkPlaceByIdRepositorySpy)
  return {
    sut,
    checkPlaceByIdRepositorySpy
  }
}

describe('DbCheckPlaceById', () => {
  test('Should call CheckPlaceByIdRepository with correct value', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    const params = mockCheckPlaceByIdRepositoryParams()
    await sut.checkById(params)
    expect(checkPlaceByIdRepositorySpy.params).toEqual(params)
  })
})
