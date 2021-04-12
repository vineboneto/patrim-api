import { DbSaveOwner } from '@/data/usecases'
import {
  AddOwnerRepositorySpy,
  CheckSectorByIdRepositorySpy,
  mockAddOwnerParams,
  mockUpdateOwnerParams,
  UpdateOwnerRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveOwner
  addOwnerRepositorySpy: AddOwnerRepositorySpy
  updateOwnerRepositorySpy: UpdateOwnerRepositorySpy
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const updateOwnerRepositorySpy = new UpdateOwnerRepositorySpy()
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbSaveOwner(addOwnerRepositorySpy, updateOwnerRepositorySpy, checkSectorByIdRepositorySpy)
  return {
    sut,
    addOwnerRepositorySpy,
    updateOwnerRepositorySpy,
    checkSectorByIdRepositorySpy
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

  test('Should return null if UpdateOwnerRepository return null', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    updateOwnerRepositorySpy.model = null
    const owner = await sut.save(mockUpdateOwnerParams())
    expect(owner).toBeNull()
  })

  test('Should return owner if UpdateOwnerRepository returns owner', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    const owner = await sut.save(mockUpdateOwnerParams())
    expect(owner).toEqual(updateOwnerRepositorySpy.model)
  })

  test('Should throw if UpdateOwnerRepository throws', async () => {
    const { sut, updateOwnerRepositorySpy } = makeSut()
    jest.spyOn(updateOwnerRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const data = mockUpdateOwnerParams()
    await sut.save(data)
    expect(checkSectorByIdRepositorySpy.id).toEqual(data.sectorId)
  })
})
