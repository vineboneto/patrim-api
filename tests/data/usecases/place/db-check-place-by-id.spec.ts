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

  test('Should return false if CheckPlaceByIdRepository returns false', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    checkPlaceByIdRepositorySpy.result = false
    await sut.checkById(mockCheckPlaceByIdRepositoryParams())
    expect(checkPlaceByIdRepositorySpy.result).toBe(false)
  })

  test('Should return true if CheckPlaceByIdRepository returns true', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    await sut.checkById(mockCheckPlaceByIdRepositoryParams())
    expect(checkPlaceByIdRepositorySpy.result).toBe(true)
  })
})
