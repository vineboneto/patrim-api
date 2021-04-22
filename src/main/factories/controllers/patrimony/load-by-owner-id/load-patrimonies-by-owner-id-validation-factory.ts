import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadPatrimoniesByOwnerIdValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  validations.push(new CheckFieldIsNumberValidation('id'))
  return new ValidationComposite(validations)
}
