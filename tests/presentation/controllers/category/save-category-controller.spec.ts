import { SaveCategoryController } from '@/presentation/controllers'
import { badRequest, forbidden } from '@/presentation/helper'
import { AlreadyExistsError, MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { SaveCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SaveCategoryController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: SaveCategoryController
  validationSpy: ValidationSpy
  saveCategorySpy: SaveCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveCategorySpy = new SaveCategorySpy()
  const sut = new SaveCategoryController(validationSpy, saveCategorySpy)
  return {
    sut,
    validationSpy,
    saveCategorySpy
  }
}

describe('SaveCategoryController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 Validation if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.result))
  })

  test('Should call SaveCategory with correct value', async () => {
    const { sut, saveCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveCategorySpy.params).toEqual(request)
  })

  test('Should call SaveCategory with correct value', async () => {
    const { sut, saveCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveCategorySpy.params).toEqual(request)
  })

  test('Should return 403 if SaveCategory fails', async () => {
    const { sut, saveCategorySpy } = makeSut()
    saveCategorySpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AlreadyExistsError(request.name)))
  })
})
