import { UpdateCategoryController } from '@/presentation/controllers'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { CheckCategoryByIdSpy, SaveCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateCategoryController.Request => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: UpdateCategoryController
  validationSpy: ValidationSpy
  saveCategorySpy: SaveCategorySpy
  checkCategoryByIdSpy: CheckCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const saveCategorySpy = new SaveCategorySpy()
  const sut = new UpdateCategoryController(validationSpy, saveCategorySpy, checkCategoryByIdSpy)
  return {
    sut,
    validationSpy,
    saveCategorySpy,
    checkCategoryByIdSpy
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

  test('Should call CheckCategoryById with correct value', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkCategoryByIdSpy.id).toEqual(request.id)
  })

  test('Should return 403 if CheckCategoryById if return false', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    checkCategoryByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if CheckCategoryById throws', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkCategoryByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 500 if SaveCategory throws', async () => {
    const { sut, saveCategorySpy } = makeSut()
    const error = new Error()
    jest.spyOn(saveCategorySpy, 'save').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
