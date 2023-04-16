import cloudinary from 'cloudinary'
import streamifier from 'streamifier'

export default abstract class CloudinaryService {
  private static cld = cloudinary.v2

  private static streamifier = streamifier

  static uploadDataStream(data: Buffer, folder: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const upload_stream = this.cld.uploader.upload_stream(
        { folder },
        async (error: any, result: any) => {
          if (error) {
            console.log(error)
            console.log('log error and report to error monitoring software')
            reject(false)
          } else {
            console.log('UPLOAD SUCCESS' + result)
            resolve(true)
          }
        }
      )
      this.streamifier.createReadStream(data).pipe(upload_stream)
    })
  }

  static deleteResource(publicId: string) {
    return new Promise((resolve, reject) => {
      this.cld.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.log(error)
          console.log('log error and report to error monitoring software')
          reject(false)
        } else {
          console.log('DELETE SUCCESSFUL' + result)
          resolve(true)
        }
      })
    })
  }

  static updateData(data: Buffer, folder: string, public_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const uploadstream = this.cld.uploader.upload_stream(
        {
          folder,
          public_id,
          invalidate: true,
          overwrite: true,
        },
        async (error, result) => {
          if (error) {
            console.log(error)
            console.log('log error and report to error monitoring software')
            reject(false)
          } else {
            console.log('UPLOAD UPDATE SUCCESS' + result)
            resolve(true)
          }
        }
      )
      this.streamifier.createReadStream(data).pipe(uploadstream)
    })
  }
}
