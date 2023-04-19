import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { quotationPayloadValidatorSchema } from './Validators/QuotationValidator'
import Quotation from 'App/Models/Quotation'
import ServerResponse from 'App/Utils/Response'
import { QuotationPayload } from './Types/Quotation'
import Job from 'App/Models/Job'

export default class QuotationsController {
  public async createQuotation(ctx: HttpContextContract) {
    const { schema, messages } = quotationPayloadValidatorSchema()
    const validatedPayload = (await ctx.request.validate({ messages, schema })) as QuotationPayload
    await Job.findByOrFail('id', validatedPayload.jobID)
    const quotation = await Quotation.create({ ...validatedPayload, makerId: ctx.auth.user?.id! })
    new ServerResponse()
      .setMessage('quotation sent')
      .setStatusCode(201)
      .setBody(quotation)
      .respond(ctx)
  }
}
