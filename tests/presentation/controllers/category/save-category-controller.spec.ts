import { SaveCategoryController } from '@/presentation/controllers/'
import { badRequest, noContent, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { SaveCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SaveCategoryController.Request => ({
  name: faker.name.jobArea()
})

type SutTypes = {
  saveCategorySpy: SaveCategorySpy
  validationSpy: ValidationSpy
  sut: SaveCategoryController
}

const makeSut = (): SutTypes => {
  const saveCategorySpy = new SaveCategorySpy()
  const validationSpy = new ValidationSpy()
  const sut = new SaveCategoryController(saveCategorySpy, validationSpy)
  return {
    saveCategorySpy,
    validationSpy,
    sut
  }
}

describe('SaveCategoryController', async () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const validation = await sut.handle(mockRequest())
    expect(validation).toEqual(badRequest(new Error()))
  })

  test('Should call SaveCategory with correct values', async () => {
    const { sut, saveCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveCategorySpy.params).toEqual({
      id: Number(request.id),
      name: request.name
    })
  })

  test('Should return 422 if SaveCategory return false', async () => {
    const { sut, saveCategorySpy } = makeSut()
    saveCategorySpy.result = false
    const param = mockRequest()
    const exists = await sut.handle(param)
    expect(exists).toEqual(unprocessableEntity(new AlreadyExistsError(param.name)))
  })

  test('Should return 500 if SaveCategory throws', async () => {
    const { sut, saveCategorySpy } = makeSut()
    jest.spyOn(saveCategorySpy, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
