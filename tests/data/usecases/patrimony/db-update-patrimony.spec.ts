import { DbUpdatePatrimony } from '@/data/usecases'
import {
  CheckPatrimonyByFieldRepositorySpy,
  LoadPatrimonyFieldByIdRepositorySpy,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdatePatrimonyParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdatePatrimony
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
  loadPatrimonyFieldByIdRepositorySpy: LoadPatrimonyFieldByIdRepositorySpy
  checkPatrimonyByFieldRepositorySpy: CheckPatrimonyByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const loadPatrimonyFieldByIdRepositorySpy = new LoadPatrimonyFieldByIdRepositorySpy()
  const checkPatrimonyByFieldRepositorySpy = new CheckPatrimonyByFieldRepositorySpy()
  const sut = new DbUpdatePatrimony(
    updatePatrimonyRepositorySpy,
    loadPatrimonyFieldByIdRepositorySpy,
    checkPatrimonyByFieldRepositorySpy
  )
  return {
    sut,
    updatePatrimonyRepositorySpy,
    loadPatrimonyFieldByIdRepositorySpy,
    checkPatrimonyByFieldRepositorySpy
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

  test('Should call LoadPatrimonyFieldByIdRepository with correct values', async () => {
    const { sut, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(loadPatrimonyFieldByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadPatrimonyFieldByIdRepository return different number', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    loadPatrimonyFieldByIdRepositorySpy.data = 'differentField'
    checkPatrimonyByFieldRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if LoadPatrimonyFieldByIdRepository throw', async () => {
    const { sut, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimonyFieldByIdRepositorySpy, 'loadFieldById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPatrimonyByFieldRepository with correct values', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    loadPatrimonyFieldByIdRepositorySpy.data = 'differentField'
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(checkPatrimonyByFieldRepositorySpy.params).toEqual({
      accountId: params.accountId,
      value: params.number
    })
  })

  test('Should return null if CheckPatrimonyByFieldRepository return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    params.number = undefined
    await sut.update(params)
    expect(checkPatrimonyByFieldRepositorySpy.callsCount).toBe(0)
  })

  test('Should return null if CheckPatrimonyByFieldRepository return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    loadPatrimonyFieldByIdRepositorySpy.data = 'differentField'
    checkPatrimonyByFieldRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckPatrimonyByFieldRepository throw', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadPatrimonyFieldByIdRepositorySpy } = makeSut()
    loadPatrimonyFieldByIdRepositorySpy.data = 'differentField'
    jest.spyOn(checkPatrimonyByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
