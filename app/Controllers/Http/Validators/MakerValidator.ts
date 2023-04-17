import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const makerPayloadValidatorSchema = () => {
  const dataSchema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(50), rules.required()]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'makers', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.required(),
      // at least 1 uppercase, at least 1 lowercase, at least 1 digit, at least 1 special character, minimum 8 digits
      rules.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
    bio: schema.string.optional({ trim: true }),
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
  return { messages, schema: dataSchema }
}
