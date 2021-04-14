import { makeLoadOwnersValidation } from '@/main/factories/controllers'
import { ValidationComposite, CheckFieldIsNumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteSectorValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadOwnersValidation()
    const validations: Validation[] = []
    for (const query of ['take', 'skip']) {
      validations.push(new CheckFieldIsNumberValidation(query))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
