import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPlaceValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('name'))
  validations.push(new CheckFieldIsNumberValidation('userId'))
  return new ValidationComposite(validations)
}
