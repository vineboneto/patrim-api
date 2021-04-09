import { DeleteCategoryController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helper'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { DeleteCategorySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteCategoryController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteCategoryController
  deleteCategorySpy: DeleteCategorySpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deleteCategorySpy = new DeleteCategorySpy()
  const sut = new DeleteCategoryController(deleteCategorySpy, validationSpy)
  return {
    sut,
    deleteCategorySpy,
    validationSpy
  }
}

describe('DeleteCategoryController', () => {
  test('Should call DeleteCategory with correct value', async () => {
    const { sut, deleteCategorySpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(deleteCategorySpy.params).toEqual({ id: Number(id) })
  })

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
})
