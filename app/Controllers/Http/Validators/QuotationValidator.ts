import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const quotationPayloadValidatorSchema = () => {
  const dataSchema = schema.create({
    price: schema.number([rules.unsigned()]),
    comment: schema.string.nullable({ trim: true }, [rules.maxLength(500)]),
    jobID: schema.string({}, [rules.required()]),
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
