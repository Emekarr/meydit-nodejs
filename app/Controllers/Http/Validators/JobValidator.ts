import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const jobPayloadValidatorSchema = () => {
  const dataSchema = schema.create({
    postCode: schema.string({ trim: true }),
    state: schema.string({ trim: true }),
    address: schema.string({ trim: true }),
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    type: schema.string({ trim: true }),
    description: schema.string({ trim: true }, [rules.maxLength(300)]),
    budget: schema.number.nullable([rules.unsigned(), rules.nullable()]),
  })
  const messages = {
    maxLength: '{{field}} can not be more than {{ options.maxLength }} characters',
    unsigned: '{{field}} must be a positive number',
  }
  return {
    schema: dataSchema,
    messages,
  }
}
