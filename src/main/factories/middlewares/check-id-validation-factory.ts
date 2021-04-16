import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, ValidationComposite } from '@/validation/validators'

export const CheckCategoryByIdValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new CheckFieldIsNumberValidation('id'))
  return new ValidationComposite(validations)
}
