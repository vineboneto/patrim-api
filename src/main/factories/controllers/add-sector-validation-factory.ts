import { Validation } from '@/presentation/protocols'
import { RequiredField, ValidationComposite } from '@/validation/validators'

export const makeAddSectorValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredField('name'))
  return new ValidationComposite(validations)
}
