import { makeSaveSectorValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SaveSectorValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveSectorValidation()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
