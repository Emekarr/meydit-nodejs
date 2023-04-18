import { v1 as uuidv1 } from 'uuid'

const generateID = (): string => {
  const id = uuidv1()
  id.replace(/^(.{8})-(.{4})-(.{4})/, '$3-$2-$1')
  return id
}

export default generateID
