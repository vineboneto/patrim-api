import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdatePlaceValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['id', 'userId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
