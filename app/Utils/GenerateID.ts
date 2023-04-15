import { v1 as uuidv4 } from 'uuid'

const generateID = (): string => {
  return uuidv4()
}

export default generateID
