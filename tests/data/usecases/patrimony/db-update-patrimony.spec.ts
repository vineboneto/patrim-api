import { DbUpdatePatrimony } from '@/data/usecases'
import {
  CheckDataByFieldRepositorySpy,
  LoadDataFieldByIdRepositorySpy,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdatePatrimonyParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdatePatrimony
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
  loadDataFieldByIdRepositorySpy: LoadDataFieldByIdRepositorySpy
  checkPatrimonyByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const loadDataFieldByIdRepositorySpy = new LoadDataFieldByIdRepositorySpy()
  loadDataFieldByIdRepositorySpy.data = { number: 'any_number' }
  const checkPatrimonyByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbUpdatePatrimony(
    updatePatrimonyRepositorySpy,
    loadDataFieldByIdRepositorySpy,
    checkPatrimonyByFieldRepositorySpy
  )
  return {
    sut,
    updatePatrimonyRepositorySpy,
    loadDataFieldByIdRepositorySpy,
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
    const { sut, updatePatrimonyRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    loadDataFieldByIdRepositorySpy.data.number = 'same_data'
    params.number = 'same_data'
    const data = await sut.update(params)
    expect(data).toEqual(updatePatrimonyRepositorySpy.model)
  })

  test('Should throws if UpdatePatrimonyRepository throw', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(updatePatrimonyRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadDataFieldByIdRepository with correct values', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(loadDataFieldByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadDataFieldByIdRepository return different number', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.number = 'differentField'
    checkPatrimonyByFieldRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if LoadDataFieldByIdRepository throw', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    jest.spyOn(loadDataFieldByIdRepositorySpy, 'loadFieldById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckDataByFieldRepository with correct values', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.number = 'differentField'
    const params = mockUpdatePatrimonyParams()
    await sut.update(params)
    expect(checkPatrimonyByFieldRepositorySpy.params).toEqual({
      accountId: params.accountId,
      value: params.number
    })
  })

  test('Should return null if CheckDataByFieldRepository return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyParams()
    params.number = undefined
    await sut.update(params)
    expect(checkPatrimonyByFieldRepositorySpy.callsCount).toBe(0)
  })

  test('Should return null if CheckDataByFieldRepository return true', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.number = 'differentField'
    checkPatrimonyByFieldRepositorySpy.result = true
    const params = mockUpdatePatrimonyParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckDataByFieldRepository throw', async () => {
    const { sut, checkPatrimonyByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.number = 'differentField'
    jest.spyOn(checkPatrimonyByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePatrimonyParams())
    await expect(promise).rejects.toThrow()
  })
})
