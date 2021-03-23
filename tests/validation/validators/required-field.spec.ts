import { RequiredField } from '@/validation/validators'

import faker from 'faker'

describe('RequiredField', () => {
  test('Should not return if field exists', () => {
    const sut = new RequiredField()
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
