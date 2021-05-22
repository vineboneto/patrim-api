import { DbUpdatePatrimony } from '@/data/usecases'
import {
  CheckPatrimonyByNumberRepositorySpy,
  LoadPatrimonyNumberByIdRepositorySpy,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdatePatrimonyParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdatePatrimony
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
  loadPatrimonyNumberByIdRepositorySpy: LoadPatrimonyNumberByIdRepositorySpy
  checkPatrimonyByNumberRepositorySpy: CheckPatrimonyByNumberRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const loadPatrimonyNumberByIdRepositorySpy = new LoadPatrimonyNumberByIdRepositorySpy()
  const checkPatrimonyByNumberRepositorySpy = new CheckPatrimonyByNumberRepositorySpy()
  const sut = new DbUpdatePatrimony(
    updatePatrimonyRepositorySpy,
    loadPatrimonyNumberByIdRepositorySpy,
    checkPatrimonyByNumberRepositorySpy
  )
  return {
    sut,
    updatePatrimonyRepositorySpy,
    loadPatrimonyNumberByIdRepositorySpy,
    checkPatrimonyByNumberRepositorySpy
  }
}

describe('DbUpdatePatrimony', () => {
  test('Should call UpdatePatrimonyRepository with correct values', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(updatePatrimonyRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdatePatrimonyRepository return null', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    updatePatrimonyRepositorySpy.model = null
    const data = await sut.update(mockUpdatePatrimonyParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const data = await sut.update(mockUpdatePatrimonyParams())
    expect(data).toEqual(updatePatrimonyRepositorySpy.model)
  })

  test('Should throws if UpdatePatrimonyRepository throw', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(updatePatrimonyRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadPatrimonyNumberByIdRepository with correct values', async () => {
    const { sut, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(loadPatrimonyNumberByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadPatrimonyNumberByIdRepository return different number', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    loadPatrimonyNumberByIdRepositorySpy.model.number = 'differentNumber'
    checkPatrimonyByNumberRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if LoadPatrimonyNumberByIdRepository throw', async () => {
    const { sut, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimonyNumberByIdRepositorySpy, 'loadNumberById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPatrimonyByNumberRepository with correct values', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    loadPatrimonyNumberByIdRepositorySpy.model.number = 'differentNumber'
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(checkPatrimonyByNumberRepositorySpy.params).toEqual({
      accountId: params.accountId,
      number: params.number
    })
  })

  test('Should return null if CheckPatrimonyByNumberRepository return true', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    params.number = undefined
    await sut.update(params)
    expect(checkPatrimonyByNumberRepositorySpy.callsCount).toBe(0)
  })

  test('Should return null if CheckPatrimonyByNumberRepository return true', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    loadPatrimonyNumberByIdRepositorySpy.model.number = 'differentNumber'
    checkPatrimonyByNumberRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckPatrimonyByNumberRepository throw', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy, loadPatrimonyNumberByIdRepositorySpy } = makeSut()
    loadPatrimonyNumberByIdRepositorySpy.model.number = 'differentNumber'
    jest.spyOn(checkPatrimonyByNumberRepositorySpy, 'checkByNumber').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
