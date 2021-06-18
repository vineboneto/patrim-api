import { DbAddSector } from '@/data/usecases'
import { CheckDataByFieldRepositorySpy, AddSectorRepositorySpy } from '@/tests/data/mocks'
import { mockAddSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddSector
  addSectorRepositorySpy: AddSectorRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const sut = new DbAddSector(addSectorRepositorySpy, checkDataByFieldRepositorySpy)
  return {
    sut,
    addSectorRepositorySpy,
    checkDataByFieldRepositorySpy
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
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    const params = mockAddSectorParams()
    await sut.add(params)
    expect(checkDataByFieldRepositorySpy.params).toEqual({
      value: params.name,
      accountId: params.accountId
    })
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    const data = await sut.add(mockAddSectorParams())
    expect(data).toBeFalsy()
  })

  test('Should throw if CheckSectorByNameRepository throws', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
