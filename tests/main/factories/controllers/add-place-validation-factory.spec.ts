import { makeAddPlaceValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation, CheckFieldIsNumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddCategoryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPlaceValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('name'))
    validations.push(new CheckFieldIsNumberValidation('userId'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
