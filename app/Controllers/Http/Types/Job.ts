export interface JobPayload {
  postCode: string
  state: string
  address: string
  firstName: string
  lastName: string
  type: string
  imagesUrl: string[] | string
  description: string
  budget: number | null
}
