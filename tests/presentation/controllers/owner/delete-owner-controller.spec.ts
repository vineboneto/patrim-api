import { DeleteOwnerController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteOwnerSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): DeleteOwnerController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeleteOwnerController
  deleteOwnerSpy: DeleteOwnerSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const deleteOwnerSpy = new DeleteOwnerSpy()
  const validationSpy = new ValidationSpy()
  const sut = new DeleteOwnerController(deleteOwnerSpy, validationSpy)
  return {
    sut,
    deleteOwnerSpy,
    validationSpy
  }
}

describe('DeleteOwnerController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call DeleteOwner with correct value', async () => {
    const { sut, deleteOwnerSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteOwnerSpy.params).toEqual(params)
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
