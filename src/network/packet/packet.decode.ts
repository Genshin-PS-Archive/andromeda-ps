import packetIds from '../packetIds.json'
import protobufjs from 'protobufjs'

type CmdId = keyof typeof packetIds

export async function decodePacket(data: Buffer) {
  const cmdId = data.readUInt16BE(2) as unknown as CmdId

  const name = packetIds[cmdId]

  const sliced = Buffer.from(data.subarray(10)).subarray(0, -2);
  const packetData = sliced.subarray(data.readUInt8(5));

  const proto = await protobufjs.load(`src/proto/${name}.proto`)
  const protoBuf = proto.lookupTypeOrEnum(name).decode(packetData).toJSON()

  return {
    name, protoBuf
  }
}