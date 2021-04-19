import { DbSavePatrimony } from '@/data/usecases'
import { AddPatrimonyRepositorySpy, mockAddPatrimonyRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePatrimony
  addPatrimonyRepositorySpy: AddPatrimonyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPatrimonyRepositorySpy = new AddPatrimonyRepositorySpy()
  const sut = new DbSavePatrimony(addPatrimonyRepositorySpy)
  return {
    sut,
    addPatrimonyRepositorySpy
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
})
