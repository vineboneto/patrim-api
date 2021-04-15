import { DeleteOwnerController } from '@/presentation/controllers/owner'
import { ok } from '@/presentation/helper'
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
    const { sut, deleteOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteOwnerSpy.params).toEqual({ id: Number(request.id) })
  })

  test('Should return 200 on delete success', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteOwnerSpy.model))
  })

  test('Should call LoadPatrimonyByOwnerId with correct value', async () => {
    const { sut, loadPatrimonyByOwnerIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimonyByOwnerIdSpy.params).toEqual({ ownerId: Number(request.id) })
  })
})
