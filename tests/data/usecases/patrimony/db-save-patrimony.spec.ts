import { DbSavePatrimony } from '@/data/usecases'
import {
  AddPatrimonyRepositorySpy,
  mockAddPatrimonyRepositoryParams,
  mockUpdatePatrimonyRepositoryParams,
  UpdatePatrimonyRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePatrimony
  addPatrimonyRepositorySpy: AddPatrimonyRepositorySpy
  updatePatrimonyRepositorySpy: UpdatePatrimonyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonyRepositorySpy = new AddPatrimonyRepositorySpy()
  const updatePatrimonyRepositorySpy = new UpdatePatrimonyRepositorySpy()
  const sut = new DbSavePatrimony(addPatrimonyRepositorySpy, updatePatrimonyRepositorySpy)
  return {
    sut,
    addPatrimonyRepositorySpy,
    updatePatrimonyRepositorySpy
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
})
