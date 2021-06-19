import { ValidationRequestDecorator } from '@/main/decorators'
import { Controller, Validation } from '@/presentation/protocols'

export const makeValidationRequestDecorator = (controller: Controller, validation: Validation): Controller => {
  return new ValidationRequestDecorator(controller, validation)
}
