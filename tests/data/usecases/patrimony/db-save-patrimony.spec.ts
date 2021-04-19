import { DbSavePatrimony } from '@/data/usecases'
import {
  AddPatrimonyRepositorySpy,
  CheckPatrimonyByNumberRepositorySpy,
  mockAddPatrimonyRepositoryParams,
  mockUpdatePatrimonyRepositoryParams,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePatrimony
  addPatrimonyRepositorySpy: AddPatrimonyRepositorySpy
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
  checkPatrimonyByNumberRepositorySpy: CheckPatrimonyByNumberRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonyRepositorySpy = new AddPatrimonyRepositorySpy()
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const checkPatrimonyByNumberRepositorySpy = new CheckPatrimonyByNumberRepositorySpy()
  const sut = new DbSavePatrimony(
    addPatrimonyRepositorySpy,
    updatePatrimonyRepositorySpy,
    checkPatrimonyByNumberRepositorySpy
  )
  return {
    sut,
    addPatrimonyRepositorySpy,
    updatePatrimonyRepositorySpy,
    checkPatrimonyByNumberRepositorySpy
  }
}

describe('DbSavePatrimony', () => {
  test('Should call AddPatrimonyRepository with correct values', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    const params = mockAddPatrimonyRepositoryParams()
    await sut.save(params)
    expect(addPatrimonyRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddPatrimonyRepository return null', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    addPatrimonyRepositorySpy.model = null
    const data = await sut.save(mockAddPatrimonyRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony if AddPatrimonyRepository return patrimony', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    const data = await sut.save(mockAddPatrimonyRepositoryParams())
    expect(data).toBe(addPatrimonyRepositorySpy.model)
  })

  test('Should throws AddPatrimonyRepository throw', async () => {
    const { sut, addPatrimonyRepositorySpy } = makeSut()
    jest.spyOn(addPatrimonyRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddPatrimonyRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdatePatrimonyRepository with correct values', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.save(params)
    expect(updatePatrimonyRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdatePatrimonyRepository return null', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    updatePatrimonyRepositorySpy.model = null
    const data = await sut.save(mockUpdatePatrimonyRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony if UpdatePatrimonyRepository return patrimony', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    const data = await sut.save(mockUpdatePatrimonyRepositoryParams())
    expect(data).toBe(updatePatrimonyRepositorySpy.model)
  })

  test('Should throws UpdatePatrimonyRepository throw', async () => {
    const { sut, updatePatrimonyRepositorySpy } = makeSut()
    jest.spyOn(updatePatrimonyRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdatePatrimonyRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPatrimonyByNumberRepository with correct values', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    const params = mockUpdatePatrimonyRepositoryParams()
    await sut.save(params)
    expect(checkPatrimonyByNumberRepositorySpy.number).toBe(params.number)
  })

  test('Should return null if CheckPatrimonyByNumberRepository return true', async () => {
    const { sut, checkPatrimonyByNumberRepositorySpy } = makeSut()
    checkPatrimonyByNumberRepositorySpy.result = true
    const params = mockUpdatePatrimonyRepositoryParams()
    const data = await sut.save(params)
    expect(data).toBe(null)
  })
})
