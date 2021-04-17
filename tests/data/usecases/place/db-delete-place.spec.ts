import { DbDeletePlace } from '@/data/usecases'
import {
  CheckPatrimonyByPlaceIdRepositorySpy,
  DeletePlaceRepositorySpy,
  mockDeletePlaceRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbDeletePlace
  deletePlaceRepositorySpy: DeletePlaceRepositorySpy
  checkPatrimonyByPlaceIdRepositorySpy: CheckPatrimonyByPlaceIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deletePlaceRepositorySpy = new DeletePlaceRepositorySpy()
  const checkPatrimonyByPlaceIdRepositorySpy = new CheckPatrimonyByPlaceIdRepositorySpy()
  const sut = new DbDeletePlace(deletePlaceRepositorySpy, checkPatrimonyByPlaceIdRepositorySpy)
  return {
    sut,
    deletePlaceRepositorySpy,
    checkPatrimonyByPlaceIdRepositorySpy
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

  test('Should call CheckPatrimonyByPlaceIdRepository with correct value', async () => {
    const { sut, checkPatrimonyByPlaceIdRepositorySpy } = makeSut()
    const params = mockDeletePlaceRepositoryParams()
    await sut.delete(params)
    expect(checkPatrimonyByPlaceIdRepositorySpy.params).toEqual({ placeId: params.id })
  })

  test('Should return null if CheckPatrimonyByPlaceIdRepository if return true', async () => {
    const { sut, checkPatrimonyByPlaceIdRepositorySpy } = makeSut()
    checkPatrimonyByPlaceIdRepositorySpy.result = true
    const data = await sut.delete(mockDeletePlaceRepositoryParams())
    expect(data).toBe(null)
  })
})
