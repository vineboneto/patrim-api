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

  test('Should return null if DeletePlaceRepository returns null', async () => {
    const { sut, deletePlaceRepositorySpy } = makeSut()
    deletePlaceRepositorySpy.model = null
    const data = await sut.delete(mockDeletePlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return place if DeletePlaceRepository returns place ', async () => {
    const { sut, deletePlaceRepositorySpy } = makeSut()
    const data = await sut.delete(mockDeletePlaceRepositoryParams())
    expect(data).toEqual(deletePlaceRepositorySpy.model)
  })

  test('Should throw if DeletePlaceRepository throws', async () => {
    const { sut, deletePlaceRepositorySpy } = makeSut()
    jest.spyOn(deletePlaceRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeletePlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})