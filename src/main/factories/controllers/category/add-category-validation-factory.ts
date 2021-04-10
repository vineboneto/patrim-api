import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddCategoryValidation = (): Validation => {
  const validations: Validation [] = []
  validations.push(new RequiredFieldValidation('name'))
  return new ValidationComposite(validations)
}
