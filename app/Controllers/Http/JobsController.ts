import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { jobPayloadValidatorSchema } from './Validators/JobValidator'
import Job from 'App/Models/Job'
import { JobPayload } from './Types/Job'
import ServerResponse from 'App/Utils/Response'
import CloudinaryService from 'App/Services/Media/Cloudinary'
import VerifyFileType from 'App/Services/Media/VerifyFileType'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export default class JobsController {
  public async createJob(ctx: HttpContextContract) {
    const { schema, messages } = jobPayloadValidatorSchema()
    const validatedPayload = (await ctx.request.validate({
      schema,
      messages,
    })) as JobPayload
    const files = ctx.request.allFiles()
    if (files.images) {
      const uploadResultPromise = (files.images as MultipartFileContract[]).map((img) => {
        VerifyFileType(img.extname ?? '', ['jpeg', 'jpg', 'svg', 'png'])
        return CloudinaryService.uploadDataStream(img.tmpPath!, 'job-images')
      })
      const uploadResults = await Promise.all(uploadResultPromise)
      validatedPayload.imagesUrl = uploadResults.map((img) => img.secure_url)
    }
    const job = await Job.create({
      ...validatedPayload,
      userId: ctx.auth.user!.id,
    })
    job.imagesUrl ? (job.imagesUrl = JSON.parse(job.imagesUrl as string)) : ''
    new ServerResponse().setMessage('job created').setBody(job).respond(ctx)
  }

  public async fetchJobs(ctx: HttpContextContract) {
    const lastID = ctx.request.input('id', '')
    const limit = ctx.request.input('limit')
    const jobs = await Job.query()
      .where('id', !lastID ? '>' : '<', lastID)
      .limit(limit)
      .orderBy('id', 'desc')
    new ServerResponse().setMessage('jobs fetched').setBody(jobs).respond(ctx)
  }
}