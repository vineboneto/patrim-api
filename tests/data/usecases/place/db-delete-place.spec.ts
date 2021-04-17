import { DbDeletePlace } from '@/data/usecases'
import { DeletePlaceRepositorySpy, mockDeletePlaceRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeletePlace
  deletePlaceRepositorySpy: DeletePlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const deletePlaceRepositorySpy = new DeletePlaceRepositorySpy()
  const sut = new DbDeletePlace(deletePlaceRepositorySpy)
  return {
    sut,
    deletePlaceRepositorySpy
  }
}

describe('DbDeletePlace', () => {
  test('Should call DeletePlaceRepository with correct value', async () => {
    const { sut, deletePlaceRepositorySpy } = makeSut()
    const params = mockDeletePlaceRepositoryParams()
    await sut.delete(params)
    expect(deletePlaceRepositorySpy.params).toEqual(params)
  })
})
