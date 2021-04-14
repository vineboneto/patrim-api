import { makeSaveOwnerValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SaveSectorValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveOwnerValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'sectorId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
