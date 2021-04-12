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

  test('Should return null if AddOwnerRepository return null', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    addOwnerRepositorySpy.model = null
    const owner = await sut.save(mockAddOwnerParams())
    expect(owner).toBeNull()
  })

  test('Should return owner if AddOwnerRepository return owner', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    const owner = await sut.save(mockAddOwnerParams())
    expect(owner).toEqual(addOwnerRepositorySpy.model)
  })

  test('Should throw if AddOwnerRepository throws', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    jest.spyOn(addOwnerRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
