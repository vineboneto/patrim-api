import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeDeletePatrimonyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
