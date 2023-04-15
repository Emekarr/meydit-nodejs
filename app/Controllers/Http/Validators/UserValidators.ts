import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const userPayloadValidatorSchema = () => {
  const dataSchema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.required(),
      // at least 1 uppercase, at least 1 lowercase, at least 1 digit, at least 1 special character, minimum 8 digits
      rules.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
    firstName: schema.string({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(50),
      rules.required(),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(50),
      rules.required(),
    ]),
    phone: schema.string({ trim: true }, [rules.required()]),
  })
  const messages = {
    'required': '{{field}} is required',
    'minLength': '{{field}} can not be less than {{ options.minLength }} characters',
    'maxLength': '{{field}} can not be more than {{ options.maxLength }} characters',
    'password.regex':
      '{{field}} must have at least 1 uppercase, at least 1 lowercase, at least 1 digit, at least 1 special character, minimum 8 digits',
    'email.email': 'pass in a valid email',
    'email.unique': 'email address is already in use',
  }
  return {
    schema: dataSchema,
    messages,
  }
}
