import { DbAddSector } from '@/data/usecases'
import { CheckSectorByNameRepositorySpy, AddSectorRepositorySpy } from '@/tests/data/mocks'
import { mockAddSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddSector
  addSectorRepositorySpy: AddSectorRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const sut = new DbAddSector(addSectorRepositorySpy, checkSectorByNameRepositorySpy)
  return {
    sut,
    addSectorRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbAddSector', () => {
  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const data = mockAddSectorParams()
    await sut.add(data)
    expect(addSectorRepositorySpy.params).toEqual(data)
  })

  test('Should return null if AddSectorRepository returns null', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.model = null
    const data = await sut.add(mockAddSectorParams())
    expect(data).toBe(null)
  })

  test('Should return sector if AddSectorRepository return sector', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const data = await sut.add(mockAddSectorParams())
    expect(data).toEqual(addSectorRepositorySpy.model)
  })

  test('Should throw if AddSectorRepository throws', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    jest.spyOn(addSectorRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const params = mockAddSectorParams()
    await sut.add(params)
    expect(checkSectorByNameRepositorySpy.params).toEqual({
      name: params.name,
      accountId: params.accountId
    })
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const data = await sut.add(mockAddSectorParams())
    expect(data).toBeFalsy()
  })

  test('Should throw if CheckSectorByNameRepository throws', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
