import { AddPlaceController } from '@/presentation/controllers'
import { AlreadyExistsError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { CheckAccountByIdSpy, SavePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddPlaceController.Request => ({
  name: faker.name.jobArea(),
  userId: faker.datatype.number().toString()
})

type SutTypes = {
  sut: AddPlaceController
  savePlaceSpy: SavePlaceSpy
  validationSpy: ValidationSpy
  checkAccountByIdSpy: CheckAccountByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const savePlaceSpy = new SavePlaceSpy()
  const checkAccountByIdSpy = new CheckAccountByIdSpy()
  const sut = new AddPlaceController(savePlaceSpy, checkAccountByIdSpy, validationSpy)
  return {
    sut,
    savePlaceSpy,
    checkAccountByIdSpy,
    validationSpy
  }
}

describe('AddPlaceController', () => {
  test('Should call Validation with only name if userId is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { name } = mockRequest()
    await sut.handle({ name })
    expect(validationSpy.input).toEqual({ name })
  })

  test('Should call Validation with name and userId if userId not is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { name, userId } = mockRequest()
    await sut.handle({ name, userId })
    expect(validationSpy.input).toEqual({ name, userId })
  })

  test('Should return 400 Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call CheckAccountByIdSpy with correct value', async () => {
    const { sut, checkAccountByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkAccountByIdSpy.id).toEqual(request.userId)
  })

  test('Should return 403 CheckAccountByIdSpy returns false', async () => {
    const { sut, checkAccountByIdSpy } = makeSut()
    checkAccountByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })

  test('Should call SavePlace with correct value', async () => {
    const { sut, savePlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(savePlaceSpy.params).toEqual(request)
  })

  test('Should return 403 if SavePlace returns false', async () => {
    const { sut, savePlaceSpy } = makeSut()
    savePlaceSpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AlreadyExistsError(request.name)))
  })
})
