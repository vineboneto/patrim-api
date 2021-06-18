import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeDeleteOwnerValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation('id'),
    new CheckFieldIsNumberValidation('id')
  ])
}
