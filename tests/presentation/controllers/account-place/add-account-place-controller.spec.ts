import { AddAccountPlaceSpy } from '@/../tests/domain/mocks'
import { AddAccountPlaceController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): AddAccountPlaceController.Request => ({
  accountId: faker.datatype.number(),
  placeId: faker.datatype.number()
})

type SutTypes = {
  sut: AddAccountPlaceController
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
  addAccountPlaceSpy: AddAccountPlaceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const addAccountPlaceSpy = new AddAccountPlaceSpy()
  const sut = new AddAccountPlaceController(validationSpy, checkExistSpy, addAccountPlaceSpy)
  return {
    sut,
    validationSpy,
    checkExistSpy,
    addAccountPlaceSpy
  }
}

describe('AddAccountPlaceController', () => {
  test('Should call Validation with correct value', async () => {
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

  test('Should call CheckExist with correct value', async () => {
    const { sut, checkExistSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExistSpy.input).toEqual(request)
  })

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if CheckExists throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddAccountPlace with correct value', async () => {
    const { sut, addAccountPlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountPlaceSpy.params).toEqual(request)
  })
})
