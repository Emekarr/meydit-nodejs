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

  public async fetchAllQuotationsMaker(ctx: HttpContextContract) {
    const lastID = ctx.request.input('id', '')
    const limit = ctx.request.input('limit', 15)
    const jobID = ctx.request.input('job', '')
    let quotations: Quotation[] = []
    if (ctx.session.get('role') === 'user') {
      if (!jobID) {
        new ServerResponse().setMessage('pass in a jobID').setStatusCode(400).respond(ctx)
        return
      }
      const job = await Job.query().where('user_id', ctx.auth.user?.id!).where('id', jobID).limit(1)
      if (!job[0]) {
        new ServerResponse().setMessage('this job does not exist').setStatusCode(404).respond(ctx)
        return
      }
      quotations = await Quotation.query()
        .where('id', !lastID ? '>' : '<', lastID)
        .where('job_id', jobID)
        .limit(limit)
        .orderBy('id', 'desc')
    } else {
      quotations = await Quotation.query()
        .where('id', !lastID ? '>' : '<', lastID)
        .where('maker_id', ctx.auth.user?.id!)
        .where('job_id', !jobID ? '!=' : '=', jobID)
        .limit(limit)
        .orderBy('id', 'desc')
    }

    new ServerResponse().setMessage('quotations fetched').setBody(quotations).respond(ctx)
  }
}
