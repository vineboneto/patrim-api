import { DbSavePlace } from '@/data/usecases'
import { CheckPlaceByNameRepositorySpy, mockAddPlaceParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const sut = new DbSavePlace(checkPlaceByNameRepositorySpy)
  return {
    sut,
    checkPlaceByNameRepositorySpy
  }
}

describe('DbSavePlace', () => {
  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    const data = mockAddPlaceParams()
    await sut.save(data)
    expect(checkPlaceByNameRepositorySpy.name).toBe(data.name)
  })
})
