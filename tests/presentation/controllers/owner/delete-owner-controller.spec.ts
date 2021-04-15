import { DeleteOwnerController } from '@/presentation/controllers/owner'
import { LinkedDataError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { DeleteOwnerSpy, LoadPatrimonyByOwnerIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteOwnerController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteOwnerController
  deleteOwnerSpy: DeleteOwnerSpy
  loadPatrimonyByOwnerIdSpy: LoadPatrimonyByOwnerIdSpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerSpy = new DeleteOwnerSpy()
  const loadPatrimonyByOwnerIdSpy = new LoadPatrimonyByOwnerIdSpy()
  const sut = new DeleteOwnerController(deleteOwnerSpy, loadPatrimonyByOwnerIdSpy)
  return {
    sut,
    deleteOwnerSpy,
    loadPatrimonyByOwnerIdSpy
  }
}

describe('DeleteOwnerController', () => {
  test('Should call DeleteOwner with correct value', async () => {
    const { sut, deleteOwnerSpy, loadPatrimonyByOwnerIdSpy } = makeSut()
    loadPatrimonyByOwnerIdSpy.model = null
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteOwnerSpy.params).toEqual({ id: Number(request.id) })
  })

  test('Should call LoadPatrimonyByOwnerId with correct value', async () => {
    const { sut, loadPatrimonyByOwnerIdSpy } = makeSut()
    loadPatrimonyByOwnerIdSpy.model = null
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimonyByOwnerIdSpy.params).toEqual({ ownerId: Number(request.id) })
  })

  test('Should return 403 if LoadPatrimonyByOwnerId returns patrimony', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new LinkedDataError('patrimonies')))
  })

  test('Should return 200 on delete success', async () => {
    const { sut, deleteOwnerSpy, loadPatrimonyByOwnerIdSpy } = makeSut()
    loadPatrimonyByOwnerIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteOwnerSpy.model))
  })

  test('Should return 500 if DeleteOwner throws', async () => {
    const { sut, deleteOwnerSpy, loadPatrimonyByOwnerIdSpy } = makeSut()
    loadPatrimonyByOwnerIdSpy.model = null
    jest.spyOn(deleteOwnerSpy, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if LoadPatrimonyByOwnerId throws', async () => {
    const { sut, loadPatrimonyByOwnerIdSpy } = makeSut()
    jest.spyOn(loadPatrimonyByOwnerIdSpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
