import protobuf from 'protobufjs'

export async function protobufEncode(name: string, obj: any) {
  const root = await protobuf.load(`src/network/proto/${name}.proto`)
  const message = root.lookupTypeOrEnum(name)

  const encodedBuffer = Buffer.from(message.encode(obj).finish())
  return encodedBuffer
}