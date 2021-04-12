import { DbSaveOwner } from '@/data/usecases'
import {
  AddOwnerRepositorySpy,
  mockAddOwnerParams,
  mockUpdateOwnerParams,
  UpdateOwnerRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveOwner
  addOwnerRepositorySpy: AddOwnerRepositorySpy
  updateOwnerRepositorySpy: UpdateOwnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const updateOwnerRepositorySpy = new UpdateOwnerRepositorySpy()
  const sut = new DbSaveOwner(addOwnerRepositorySpy, updateOwnerRepositorySpy)
  return {
    sut,
    addOwnerRepositorySpy,
    updateOwnerRepositorySpy
  }
}

describe('DbSaveOwner', () => {
  test('Should call AddOwnerRepository with correct value', async () => {
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

  test('Should call UpdateOwnerRepository with correct value', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const data = mockUpdateOwnerParams()
    await sut.save(data)
    expect(updateOwnerRepositorySpy.params).toEqual(data)
  })
})
