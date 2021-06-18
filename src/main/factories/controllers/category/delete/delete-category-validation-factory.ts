import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeDeleteCategoryValidation = (): Validation => {
  return new ValidationComposite([
    new RequiredFieldValidation('id'),
    new CheckFieldIsNumberValidation('id')
  ])
}
