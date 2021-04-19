import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSaveToAddPatrimonyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['number', 'brand', 'categoryId', 'placeId', 'ownerId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['categoryId', 'placeId', 'ownerId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
