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
})
