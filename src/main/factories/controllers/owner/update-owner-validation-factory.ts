import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdateOwnerValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'id', 'sectorId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  for (const field of ['id', 'sectorId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
