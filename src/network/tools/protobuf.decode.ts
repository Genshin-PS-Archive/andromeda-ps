import protobuf from 'protobufjs'

export async function protobufDecode(name: string, encodedBuffer: Buffer) {
  const root = await protobuf.load(`src/network/proto/${name}.proto`)
  const message = root.lookupTypeOrEnum(name)

  const obj = message.decode(encodedBuffer).toJSON()
  return obj
}