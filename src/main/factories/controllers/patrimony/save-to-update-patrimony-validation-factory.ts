import { Validation } from '@/presentation/protocols'
import { CheckFieldIsNumberValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSaveToUpdatePatrimonyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['id', 'number', 'brand', 'categoryId', 'placeId', 'ownerId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const field of ['id', 'categoryId', 'placeId', 'ownerId']) {
    validations.push(new CheckFieldIsNumberValidation(field))
  }
  return new ValidationComposite(validations)
}
