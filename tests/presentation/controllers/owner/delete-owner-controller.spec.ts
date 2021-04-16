import { DeleteOwnerController } from '@/presentation/controllers/owner'
import { ok, serverError } from '@/presentation/helper'
import { DeleteOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteOwnerController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteOwnerController
  deleteOwnerSpy: DeleteOwnerSpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerSpy = new DeleteOwnerSpy()
  const sut = new DeleteOwnerController(deleteOwnerSpy)
  return {
    sut,
    deleteOwnerSpy
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

  test('Should return 500 if DeleteOwner throws', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    jest.spyOn(deleteOwnerSpy, 'delete').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
