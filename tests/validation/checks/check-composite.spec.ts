import { CheckExistComposite } from '@/validation/checks'
import { InvalidParamError } from '@/presentation/errors'
import { CheckExistSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

type SutTypes = {
  sut: CheckExistComposite
  checkSpies: CheckExistSpy[]
}

const makeSut = (): SutTypes => {
  const checkSpies = [new CheckExistSpy(), new CheckExistSpy()]
  const sut = new CheckExistComposite(checkSpies)
  return {
    sut,
    checkSpies
  }
}

describe('CheckExistComposite', () => {
  test('Should return an error if any check fails', async () => {
    const { sut, checkSpies } = makeSut()
    checkSpies[0].result = new InvalidParamError('field')
    const error = await sut.check({ field: faker.random.word() })
    expect(error).toEqual(checkSpies[0].result)
  })

  test('Should return the first error if more then one check fails', async () => {
    const { sut, checkSpies } = makeSut()
    checkSpies[0].result = new InvalidParamError('field')
    checkSpies[1].result = new InvalidParamError('otherField')
    const error = await sut.check({ field: faker.random.word() })
    expect(error).toEqual(checkSpies[0].result)
  })

  test('Should return null if check succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.check({ field: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
