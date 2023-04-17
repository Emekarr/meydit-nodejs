export default (fileType: string, allowdTypes: string[]) => {
  const exists = allowdTypes.includes(fileType)
  if (!exists) throw new Error(`file type ${fileType} is not allowed`)
}
