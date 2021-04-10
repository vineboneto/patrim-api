import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSaveCategoryValidation = (): Validation => {
  const validations: Validation [] = []
  for (const field of ['id', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CheckFieldIsNumberValidation('id'))
  return new ValidationComposite(validations)
}
