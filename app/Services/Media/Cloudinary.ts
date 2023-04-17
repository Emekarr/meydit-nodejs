import cloudinary from 'cloudinary'

export default abstract class CloudinaryService {
  private static cld = cloudinary.v2

  static uploadDataStream(filePath: string, folder: string): Promise<cloudinary.UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const response = this.cld.uploader.upload(
        filePath,
        { folder },
        async (error: any, result: any) => {
          if (error) {
            console.log(error)
            console.log('log error and report to error monitoring software')
            reject(response)
          } else {
            console.log('UPLOAD SUCCESS' + result)
            resolve(response)
          }
        }
      )
    })
  }
}
