import { makeDeleteCategoryValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation, CheckFieldIsNumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteCategoryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteCategoryValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validations.push(new CheckFieldIsNumberValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
