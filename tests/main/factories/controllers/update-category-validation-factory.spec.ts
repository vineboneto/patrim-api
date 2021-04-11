import { makeUpdateCategoryValidation } from '@/main/factories/controllers'
import { ValidationComposite, RequiredFieldValidation, CheckFieldIsNumberValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SaveCategoryValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateCategoryValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CheckFieldIsNumberValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
