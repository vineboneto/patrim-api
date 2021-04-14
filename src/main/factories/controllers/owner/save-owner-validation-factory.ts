import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeSaveOwnerValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'sectorId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
