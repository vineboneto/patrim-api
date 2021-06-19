import { UpdateOwnerController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateOwnerController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdateOwnerController
  validationSpy: ValidationSpy
  updateOwnerSpy: UpdateOwnerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateOwnerSpy = new UpdateOwnerSpy()
  const sut = new UpdateOwnerController(validationSpy, updateOwnerSpy)
  return {
    sut,
    validationSpy,
    updateOwnerSpy
  }
}

describe('UpdateOwnerController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call UpdateOwner with correct value', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateOwnerSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateOwnerSpy.model))
  })

  test('Should return 500 if UpdateOwner throws', async () => {
    const { sut, updateOwnerSpy } = makeSut()
    jest.spyOn(updateOwnerSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
