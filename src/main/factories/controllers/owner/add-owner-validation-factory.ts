import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddOwnerValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'sectorId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CheckFieldIsNumberValidation('sectorId'))
  return new ValidationComposite(validations)
}
