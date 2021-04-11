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

  test('Should return false CheckPlaceByNameRepository returns true', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    checkPlaceByNameRepositorySpy.result = true
    const result = await sut.save(mockAddPlaceParams())
    expect(result).toBe(false)
  })

  test('Should throw CheckPlaceByNameRepository throw', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    jest.spyOn(checkPlaceByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddPlaceParams())
    await expect(promise).rejects.toThrow()
  })
})
