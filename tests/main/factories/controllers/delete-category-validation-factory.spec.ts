import { makeDeleteCategoryValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteCategoryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteCategoryValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
