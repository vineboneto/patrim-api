import { DbSaveSector } from '@/data/usecases'
import { CheckSectorByNameRepositorySpy, SaveSectorRepositorySpy } from '@/tests/data/mocks'
import { mockSaveSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveSector
  saveSectorRepositorySpy: SaveSectorRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const saveSectorRepositorySpy = new SaveSectorRepositorySpy()
  const sut = new DbSaveSector(saveSectorRepositorySpy, checkSectorByNameRepositorySpy)
  return {
    sut,
    saveSectorRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbSaveSector', () => {
  test('Should call SaveSectorRepository with correct value', async () => {
    const { sut, saveSectorRepositorySpy } = makeSut()
    const sector = mockSaveSectorParams()
    await sut.save(sector)
    expect(saveSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should return false if SaveSectorRepository returns false', async () => {
    const { sut, saveSectorRepositorySpy } = makeSut()
    saveSectorRepositorySpy.result = false
    const result = await sut.save(mockSaveSectorParams())
    expect(result).toBe(false)
  })

  test('Should throw if SaveSectorRepository throws', async () => {
    const { sut, saveSectorRepositorySpy } = makeSut()
    jest.spyOn(saveSectorRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const Sector = mockSaveSectorParams()
    await sut.save(Sector)
    expect(checkSectorByNameRepositorySpy.name).toEqual(Sector.name)
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const isValid = await sut.save(mockSaveSectorParams())
    expect(isValid).toBeFalsy()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockSaveSectorParams())
    expect(isValid).toBeTruthy()
  })
})
