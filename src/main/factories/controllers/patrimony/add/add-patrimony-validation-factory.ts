import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPatrimonyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['brand', 'categoryId', 'ownerId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['categoryId', 'ownerId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
