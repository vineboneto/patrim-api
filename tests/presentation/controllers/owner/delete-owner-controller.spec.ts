import { DeleteOwnerController } from '@/presentation/controllers'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteOwnerController.Request => ({
  id: faker.datatype.number().toString(),
  accountId: faker.datatype.number()
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
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteOwnerSpy.params).toEqual({
      id: Number(params.id),
      accountId: params.accountId
    })
  })

  test('Should return 422 if DeleteOwner return null', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    deleteOwnerSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unprocessableEntity(new LinkedDataError('patrimonies')))
  })

  test('Should return 200 with ownerDeleted if DeleteOwner succeeds', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteOwnerSpy.model))
  })

  test('Should return 500 if DeleteOwner throws', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    const error = new Error()
    jest.spyOn(deleteOwnerSpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
