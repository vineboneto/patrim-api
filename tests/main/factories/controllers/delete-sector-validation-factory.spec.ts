import { makeDeleteSectorValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation, CheckFieldIsNumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteSectorValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteSectorValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validations.push(new CheckFieldIsNumberValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
