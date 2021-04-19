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
})
