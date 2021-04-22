import { DbAddAccountPlace } from '@/data/usecases'
import { AddAccountPlaceRepositorySpy, mockAddAccountPlaceRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccountPlace
  addAccountPlaceRepositorySpy: AddAccountPlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAccountPlaceRepositorySpy = new AddAccountPlaceRepositorySpy()
  const sut = new DbAddAccountPlace(addAccountPlaceRepositorySpy)
  return {
    sut,
    addAccountPlaceRepositorySpy
  }
}

describe('DbAddAccountPlace', () => {
  test('Should call AddAccountPlaceRepository with correct value', async () => {
    const { sut, addAccountPlaceRepositorySpy } = makeSut()
    const params = mockAddAccountPlaceRepositoryParams()
    await sut.add(params)
    expect(addAccountPlaceRepositorySpy.params).toEqual(params)
  })

  test('Should return null AddAccountPlaceRepository return null', async () => {
    const { sut, addAccountPlaceRepositorySpy } = makeSut()
    addAccountPlaceRepositorySpy.model = null
    const data = await sut.add(mockAddAccountPlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return data on success', async () => {
    const { sut, addAccountPlaceRepositorySpy } = makeSut()
    const data = await sut.add(mockAddAccountPlaceRepositoryParams())
    expect(data).toEqual(addAccountPlaceRepositorySpy.model)
  })
})
