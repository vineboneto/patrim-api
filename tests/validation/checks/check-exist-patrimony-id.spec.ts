import { CheckExistPatrimonyId } from '@/validation/checks'
import { CheckPatrimonyByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistPatrimonyId
  checkPatrimonyByIdSpy: CheckPatrimonyByIdSpy
}

const makeSut = (): SutTypes => {
  const checkPatrimonyByIdSpy = new CheckPatrimonyByIdSpy()
  const sut = new CheckExistPatrimonyId(checkPatrimonyByIdSpy, 'patrimonyId')
  return {
    sut,
    checkPatrimonyByIdSpy
  }
}

describe('CheckExistPatrimonyId', () => {
  test('Should call CheckPatrimonyById with correct values', async () => {
    const { sut, checkPatrimonyByIdSpy } = makeSut()
    const id = faker.datatype.number()
    await sut.check({ patrimonyId: id })
    expect(checkPatrimonyByIdSpy.params).toEqual({ id })
  })

  test('Should return InvalidParamError if CheckPatrimonyById returns false', async () => {
    const { sut, checkPatrimonyByIdSpy } = makeSut()
    checkPatrimonyByIdSpy.result = false
    const error = await sut.check({ patrimonyId: faker.datatype.number() })
    expect(error).toEqual(new InvalidParamError('patrimonyId'))
  })

  test('Should return null if CheckPatrimonyById returns true', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ patrimonyId: faker.datatype.number() })
    expect(error).toEqual(null)
  })

  test('Should throw if CheckPatrimonyById throw', async () => {
    const { sut, checkPatrimonyByIdSpy } = makeSut()
    jest.spyOn(checkPatrimonyByIdSpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.check({ patrimonyId: faker.datatype.number() })
    await expect(promise).rejects.toThrow()
  })
})
