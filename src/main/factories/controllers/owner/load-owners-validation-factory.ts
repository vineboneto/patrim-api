import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadOwnersValidation = (): Validation => {
  const validations: Validation[] = []
  for (const query of ['take', 'skip']) {
    validations.push(new CheckFieldIsNumberValidation(query))
  }
  return new ValidationComposite(validations)
}
