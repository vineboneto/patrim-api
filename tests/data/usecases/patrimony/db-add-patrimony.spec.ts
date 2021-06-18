import { mockAddPatrimonyParams } from '@/tests/domain/mocks'
import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimonyRepositorySpy, CheckPatrimonyByFieldRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddPatrimony
  addPatrimonyRepositorySpy: AddPatrimonyRepositorySpy
  checkPatrimonyByFieldRepositorySpy: CheckPatrimonyByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonyRepositorySpy = new AddPatrimonyRepositorySpy()
  const checkPatrimonyByFieldRepositorySpy = new CheckPatrimonyByFieldRepositorySpy()
  const sut = new DbAddPatrimony(addPatrimonyRepositorySpy, checkPatrimonyByFieldRepositorySpy)
  return {
    sut,
    addPatrimonyRepositorySpy,
    checkPatrimonyByFieldRepositorySpy
  }
}

describe('DbAddPatrimony', () => {
  test('Should call AddPatrimonyRepository with correct values', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    const params = mockAddPatrimonyParams()
    await sut.add(params)
    expect(addPatrimonyRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddPatrimonyRepository return null', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    addPatrimonyRepositorySpy.model = null
    const data = await sut.add(mockAddPatrimonyParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony if AddPatrimonyRepository return patrimony', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    const data = await sut.add(mockAddPatrimonyParams())
    expect(data).toBe(addPatrimonyRepositorySpy.model)
  })

  test('Should throws AddPatrimonyRepository throw', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    jest.spyOn(addPatrimonyRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddPatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPatrimonyByFieldRepositorySpy with correct values', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    const params = mockAddPatrimonyParams()
    await sut.add(params)
    expect(checkPatrimonyByFieldRepositorySpy.params.value).toBe(params.number)
    expect(checkPatrimonyByFieldRepositorySpy.params.accountId).toBe(params.accountId)
  })

  test('Should not call CheckPatrimonyByFieldRepositorySpy if number is null', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    const params = mockAddPatrimonyParams()
    params.number = undefined
    await sut.add(params)
    expect(checkPatrimonyByFieldRepositorySpy.callsCount).toBe(0)
  })

  test('Should return null if CheckPatrimonyByFieldRepositorySpy return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    checkPatrimonyByFieldRepositorySpy.result = true
    const params = mockAddPatrimonyParams()
    const data = await sut.add(params)
    expect(data).toBe(null)
  })

  test('Should throws CheckPatrimonyByFieldRepository throw', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddPatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
