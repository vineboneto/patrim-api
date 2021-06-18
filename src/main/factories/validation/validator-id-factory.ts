import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeValidationId = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation('id'),
    new CheckFieldIsNumberValidation('id')
  ])
}
