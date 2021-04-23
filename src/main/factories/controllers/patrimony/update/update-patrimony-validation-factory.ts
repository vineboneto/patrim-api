import { Validation } from '@/presentation/protocols'
import {
  CheckFieldIsNumberValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeUpdatePatrimonyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id', 'number', 'brand', 'categoryId', 'ownerId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['id', 'categoryId', 'ownerId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
