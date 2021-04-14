import { badRequest, noContent } from '@/presentation/helper'
import { LoadOwnersController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadOwnersSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadOwnersController.Request => ({
  take: faker.datatype.number().toString(),
  skip: faker.datatype.number().toString()
})

type SutTypes = {
  sut: LoadOwnersController
  validationSpy: ValidationSpy
  loadOwnersSpy: LoadOwnersSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadOwnersSpy = new LoadOwnersSpy()
  const sut = new LoadOwnersController(validationSpy, loadOwnersSpy)
  return {
    sut,
    validationSpy,
    loadOwnersSpy
  }
}

describe('LoadOwnersController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new InvalidParamError('take')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('take')))
  })

  test('Should call LoadOwners with correct values', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadOwnersSpy.params).toEqual({
      skip: Number(request.skip),
      take: Number(request.take)
    })
  })

  test('Should return 204 if LoadOwners return empty array', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    loadOwnersSpy.ownersModel = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
