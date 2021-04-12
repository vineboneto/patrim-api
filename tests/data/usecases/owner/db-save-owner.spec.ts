import { DbSaveOwner } from '@/data/usecases'
import { AddOwnerRepositorySpy, mockAddOwnerParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveOwner
  addOwnerRepositorySpy: AddOwnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const sut = new DbSaveOwner(addOwnerRepositorySpy)
  return {
    sut,
    addOwnerRepositorySpy
  }
}

describe('DbSaveOwner', () => {
  test('Should call AddOwnerRepository if correct value', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const data = mockAddOwnerParams()
    await sut.save(data)
    expect(addOwnerRepositorySpy.params).toEqual(data)
  })
})
