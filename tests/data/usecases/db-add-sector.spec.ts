import { DbAddSector } from '@/data/usecases'
import { AddSectorRepositorySpy } from '@/tests/data/mocks'
import { mockAddSectorParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddSector
  addSectorRepositorySpy: AddSectorRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const sut = new DbAddSector(addSectorRepositorySpy)
  return {
    sut,
    addSectorRepositorySpy
  }
}

describe('DbAddSector', () => {
  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const addSectorParams = mockAddSectorParams()
    await sut.add(addSectorParams)
    expect(addSectorRepositorySpy.params).toEqual(addSectorParams)
  })

  test('Should  true if AddSectorRepository return true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(true)
  })

  test('Should return false if AddSectorRepository return false', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.result = false
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if AddSectorRepository throw', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    jest.spyOn(addSectorRepositorySpy, 'addSector').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
