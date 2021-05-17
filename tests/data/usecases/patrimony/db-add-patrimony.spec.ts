import { mockAddPatrimonyParams } from '@/../tests/domain/mocks'
import { DbAddPatrimony } from '@/data/usecases'
import { AddPatrimonyRepositorySpy, CheckPatrimonyByNumberRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddPatrimony
  addPatrimonyRepositorySpy: AddPatrimonyRepositorySpy
  checkPatrimonyByNumberRepositorySpy: CheckPatrimonyByNumberRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonyRepositorySpy = new AddPatrimonyRepositorySpy()
  const checkPatrimonyByNumberRepositorySpy = new CheckPatrimonyByNumberRepositorySpy()
  const sut = new DbAddPatrimony(addPatrimonyRepositorySpy, checkPatrimonyByNumberRepositorySpy)
  return {
    sut,
    addPatrimonyRepositorySpy,
    checkPatrimonyByNumberRepositorySpy
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

  test('Should call CheckPatrimonyByNumberRepository with correct values', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    const params = mockAddPatrimonyParams()
    await sut.add(params)
    expect(checkPatrimonyByNumberRepositorySpy.params.number).toBe(params.number)
  })

  test('Should return null if CheckPatrimonyByNumberRepository return true', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    checkPatrimonyByNumberRepositorySpy.result = true
    const params = mockAddPatrimonyParams()
    const data = await sut.add(params)
    expect(data).toBe(null)
  })

  test('Should throws CheckPatrimonyByNumberRepository throw', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    jest.spyOn(checkPatrimonyByNumberRepositorySpy, 'checkByNumber').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddPatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
