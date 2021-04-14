import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeDeleteCategoryValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  return new ValidationComposite(validations)
}
