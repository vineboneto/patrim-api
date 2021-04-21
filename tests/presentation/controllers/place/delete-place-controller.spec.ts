import { DeletePlaceController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { InvalidParamError, LinkedDataError } from '@/presentation/errors'
import { DeletePlaceSpy } from '@/tests/domain/mocks'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): DeletePlaceController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeletePlaceController
  deletePlaceSpy: DeletePlaceSpy
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
}

const makeSut = (): SutTypes => {
  const deletePlaceSpy = new DeletePlaceSpy()
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new DeletePlaceController(deletePlaceSpy, checkExistSpy, validationSpy)
  return {
    sut,
    deletePlaceSpy,
    checkExistSpy,
    validationSpy
  }
}

describe('DeletePlaceController', () => {
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

  test('Should call CheckExist with correct values', async () => {
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

  test('Should call DeletePlace with correct value', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deletePlaceSpy.params).toEqual(params)
  })

  test('Should return 403 if DeletePlace return null', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    deletePlaceSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new LinkedDataError('patrimonies')))
  })

  test('Should return 200 with placeDeleted if DeletePlace succeeds', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deletePlaceSpy.model))
  })

  test('Should return 500 if DeletePlace throws', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    const error = new Error()
    jest.spyOn(deletePlaceSpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 500 if CheckExists  throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
