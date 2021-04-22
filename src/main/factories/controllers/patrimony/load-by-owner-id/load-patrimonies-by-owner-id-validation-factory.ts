import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadPatrimoniesByOwnerIdValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('ownerId'))
  validations.push(new CheckFieldIsNumberValidation('ownerId'))
  return new ValidationComposite(validations)
}
